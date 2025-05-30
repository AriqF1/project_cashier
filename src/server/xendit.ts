import { PaymentRequest } from "xendit-node";

export const xenditPaymentRequestClient = new PaymentRequest({
  secretKey: process.env.XENDIT_SECRET_KEY!,
});

type CreateQRISParams = {
  amount: number;
  orderId: string;
  expiresAt?: Date;
};

export const createQRIS = async (params: CreateQRISParams) => {
  const expiresAt = params.expiresAt ?? new Date(Date.now() + 15 * 60 * 1000);

  const paymentRequest = await xenditPaymentRequestClient.createPaymentRequest({
    data: {
      currency: "IDR",
      amount: params.amount,
      referenceId: params.orderId,
      paymentMethod: {
        reusability: "ONE_TIME_USE",
        type: "QR_CODE",
        qrCode: {
          channelCode: "DANA",
          channelProperties: {
            expiresAt: expiresAt,
          },
        },
      },
    },
  });

  return paymentRequest;
};
