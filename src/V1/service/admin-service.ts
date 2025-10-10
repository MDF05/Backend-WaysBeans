import prisma from "../libs/prisma";

type RangeKey = "daily" | "weekly" | "monthly" | "yearly";

class AdminService {
  async getAnalytics(range: RangeKey) {
    // Aggregate transactions to compute KPIs and chart series
    const transactions = await prisma.transaction.findMany({
      include: { product: true },
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

    // top products by quantity sold
    const productIdToQty = new Map<number, number>();
    transactions.forEach((t) => {
      productIdToQty.set(t.productId, (productIdToQty.get(t.productId) || 0) + (t.countItem ?? 1));
    });
    const topProducts = Array.from(productIdToQty.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([productId, qty]) => ({ productId, qty }));

    // build simple time buckets from createdAt
    const now = new Date();
    function labelFor(date: Date): string {
      if (range === "daily") return date.toLocaleDateString("en-US", { weekday: "short" });
      if (range === "weekly") {
        const d = new Date(date);
        const week = Math.ceil(d.getDate() / 7);
        return `W${week}`;
      }
      if (range === "monthly") return date.toLocaleDateString("en-US", { month: "short" });
      return String(date.getFullYear());
    }

    const bucketMap = new Map<string, number>();
    transactions.forEach((t) => {
      const created = t.createdAt;
      const label = labelFor(created);
      bucketMap.set(label, (bucketMap.get(label) || 0) + parseMoney(t.gross_amount));
    });

    const series = Array.from(bucketMap.entries()).map(([label, value]) => ({ label, value }));

    return {
      kpis: {
        totalSales,
        orders,
        avgOrder,
        growth: 0, // optional: compute vs previous period in future
      },
      series,
      topProducts,
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


