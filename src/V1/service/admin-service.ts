import prisma from "../libs/prisma";

type RangeKey = "daily" | "weekly" | "monthly" | "yearly";

class AdminService {
  async getAnalytics(range: RangeKey) {
    // Aggregate transactions with product for names
    const transactions = await prisma.transaction.findMany({
      include: { product: true, profile: { include: { user: true } } },
      orderBy: { createdAt: "desc" },
    });

    // helper to parse price and amounts since schema stores strings
    const parseMoney = (v: string | null | undefined) => {
      if (!v) return 0;
      const n = Number(v);
      return Number.isFinite(n) ? n : 0;
    };

    const totalSales = transactions.reduce((sum, t) => sum + parseMoney(t.gross_amount), 0);
    const orders = transactions.length;
    const avgOrder = orders ? Math.round(totalSales / orders) : 0;

    // top products by quantity sold with product name
    const productIdTo = new Map<number, { name: string; qty: number }>();
    transactions.forEach((t) => {
      const prev = productIdTo.get(t.productId) || { name: t.product?.name || String(t.productId), qty: 0 };
      productIdTo.set(t.productId, { name: prev.name, qty: prev.qty + (t.countItem ?? 1) });
    });
    const topProducts = Array.from(productIdTo.values())
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 10);

    // Build ordered time buckets depending on range
    const now = new Date();
    type Bucket = { label: string; start: Date; end: Date };
    const buckets: Bucket[] = [];

    const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

    if (range === "daily") {
      for (let i = 6; i >= 0; i--) {
        const day = addDays(startOfDay(now), -i);
        const next = addDays(startOfDay(now), -(i - 1));
        buckets.push({ label: day.toLocaleDateString("en-US", { month: "short", day: "2-digit" }), start: day, end: addDays(day, 1) });
      }
    } else if (range === "weekly") {
      // last 8 weeks (approximate as 7-day windows)
      const start = startOfDay(addDays(now, -7 * 7));
      for (let i = 0; i < 8; i++) {
        const s = addDays(start, i * 7);
        const e = addDays(s, 7);
        buckets.push({ label: `W${i + 1}`, start: s, end: e });
      }
    } else if (range === "monthly") {
      const year = now.getFullYear();
      for (let m = 0; m < 12; m++) {
        const s = new Date(year, m, 1);
        const e = new Date(year, m + 1, 1);
        buckets.push({ label: s.toLocaleDateString("en-US", { month: "short" }), start: s, end: e });
      }
    } else {
      const currentYear = now.getFullYear();
      for (let y = currentYear - 4; y <= currentYear; y++) {
        const s = new Date(y, 0, 1);
        const e = new Date(y + 1, 0, 1);
        buckets.push({ label: String(y), start: s, end: e });
      }
    }

    const series = buckets.map((b) => {
      const sum = transactions.reduce((acc, t) => {
        const created = t.createdAt;
        if (created >= b.start && created < b.end) return acc + parseMoney(t.gross_amount);
        return acc;
      }, 0);
      return { label: b.label, value: sum };
    });

    // Hourly sales distribution (0-23)
    const hourly = Array.from({ length: 24 }).map((_, h) => {
      const value = transactions.reduce((acc, t) => {
        const hour = t.createdAt.getHours();
        return hour === h ? acc + parseMoney(t.gross_amount) : acc;
      }, 0);
      return { label: String(h).padStart(2, "0"), value };
    });

    // Weekday sales distribution (Mon..Sun)
    const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; // getDay(): 0=Sun
    const weekday = weekdayLabels.map((label, idx) => {
      const value = transactions.reduce((acc, t) => {
        return t.createdAt.getDay() === idx ? acc + parseMoney(t.gross_amount) : acc;
      }, 0);
      return { label, value };
    });

    // Last 8 weeks revenue
    const start8w = new Date(now);
    start8w.setDate(start8w.getDate() - 7 * 7); // 8 weeks → 7 gaps back from current start
    const weekly8 = Array.from({ length: 8 }).map((_, i) => {
      const s = new Date(start8w);
      s.setDate(s.getDate() + i * 7);
      const e = new Date(s);
      e.setDate(e.getDate() + 7);
      const value = transactions.reduce((acc, t) => (t.createdAt >= s && t.createdAt < e ? acc + parseMoney(t.gross_amount) : acc), 0);
      return { label: `W${i + 1}`, value };
    });

    const recent = transactions.slice(0, 10).map((t) => ({
      id: t.id,
      date: t.createdAt,
      product: t.product?.name,
      qty: t.countItem ?? 1,
      amount: t.gross_amount,
      buyer: { name: t.profile?.name, email: t.profile?.user?.email },
    }));

    return {
      kpis: { totalSales, orders, avgOrder, growth: 0 },
      series,
      hourly,
      weekday,
      weekly8,
      topProducts,
      recent,
    };
  }

  async getSalesHistory(range: RangeKey, limit: number) {
    // basic list of latest transactions including product and buyer details
    const transactions = await prisma.transaction.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        product: true,
        profile: {
          include: { user: true },
        },
      },
    });

    return transactions.map((t) => ({
      id: t.id,
      date: t.createdAt,
      product: t.product?.name,
      qty: t.countItem ?? 1,
      amount: t.gross_amount,
      buyerProfileId: t.profileId,
      buyer: {
        id: t.profile?.userId,
        name: t.profile?.name,
        email: t.profile?.user?.email,
        phone: t.profile?.phone,
        address: t.profile?.address,
      },
    }));
  }
}

export default new AdminService();


