import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { orderId, orderStatus, courierName, trackingId } = await req.json();

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const response = await fetch(`${apiUrl}/admin/orders/bulk-update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: req.headers.get("Authorization") || "",
      },
      body: JSON.stringify({
        orderIds: [orderId],
        orderStatus,
        courierName,
        trackingId,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Update failed" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Update failed: " + error.message },
      { status: 500 }
    );
  }
}