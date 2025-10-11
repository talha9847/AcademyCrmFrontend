// receiptGenerator.js - Plain HTML/CSS Receipt Generator

export const generateReceiptHTML = (transaction, studentInfo, totalFees) => {
  const receiptNumber = `REC-${transaction.id}-${new Date()
    .getTime()
    .toString()
    .slice(-6)}`;
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const transactionDate = new Date(transaction.payment_date).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const formattedAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(transaction.amount_paid);

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Receipt - ${receiptNumber}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f5f5f5;
          padding: 20px;
        }

        .receipt-container {
          max-width: 800px;
          margin: 0 auto;
          background-color: white;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          overflow: hidden;
        }

        .receipt-header {
          background: linear-gradient(135deg, #1967D2 0%, #1546a0 100%);
          color: white;
          padding: 40px 30px;
          text-align: center;
          border-bottom: 4px solid #ffd700;
        }

        .academy-name {
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 5px;
          letter-spacing: 0.5px;
        }

        .receipt-title {
          font-size: 16px;
          font-weight: 300;
          opacity: 0.95;
        }

        .receipt-content {
          padding: 40px 30px;
        }

        .section {
          margin-bottom: 30px;
        }

        .section-title {
          font-size: 13px;
          font-weight: bold;
          color: #1967D2;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 15px;
          padding-bottom: 8px;
          border-bottom: 2px solid #1967D2;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          font-size: 14px;
          color: #333;
          border-bottom: 1px solid #f0f0f0;
        }

        .info-label {
          font-weight: 600;
          color: #555;
        }

        .info-value {
          color: #333;
          text-align: right;
        }

        .student-box {
          background-color: #f9f9f9;
          border: 2px solid #e0e0e0;
          border-radius: 6px;
          padding: 20px;
          margin-bottom: 20px;
        }

        .student-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          font-size: 14px;
        }

        .student-row:last-child {
          margin-bottom: 0;
        }

        .student-label {
          font-weight: bold;
          color: #555;
          width: 35%;
        }

        .student-value {
          color: #333;
          flex: 1;
        }

        .payment-details-box {
          background-color: #f0f7ff;
          border-left: 4px solid #1967D2;
          padding: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
        }

        .payment-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          font-size: 14px;
        }

        .payment-row:last-child {
          margin-bottom: 0;
        }

        .payment-label {
          font-weight: 600;
          color: #555;
        }

        .payment-value {
          color: #333;
        }

        .amount-paid {
          font-size: 18px;
          font-weight: bold;
          color: #228B22;
        }

        .status-badge {
          display: inline-block;
          padding: 6px 16px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-paid {
          background-color: #d4edda;
          color: #155724;
        }

        .status-pending {
          background-color: #fff3cd;
          color: #856404;
        }

        .receipt-footer {
          background-color: #f5f5f5;
          padding: 25px 30px;
          border-top: 1px solid #e0e0e0;
          text-align: center;
        }

        .footer-text {
          font-size: 12px;
          color: #888;
          margin-bottom: 8px;
        }

        .footer-thanks {
          font-size: 13px;
          font-weight: 600;
          color: #1967D2;
        }

        .divider {
          height: 1px;
          background-color: #e0e0e0;
          margin: 20px 0;
        }

        @media print {
          body {
            background-color: white;
            padding: 0;
          }
          .receipt-container {
            box-shadow: none;
            max-width: 100%;
          }
        }

        @page {
          margin: 10mm;
        }
      </style>
    </head>
    <body>
      <div class="receipt-container">
        <!-- Header -->
        <div class="receipt-header">
          <div class="academy-name">Mehtab Computer Academy</div>
          <div class="receipt-title">Professional Fee Receipt</div>
        </div>

        <!-- Content -->
        <div class="receipt-content">
          <!-- Receipt Details Section -->
          <div class="section">
            <div class="section-title">Receipt Details</div>
            <div class="info-row">
              <span class="info-label">Receipt Number:</span>
              <span class="info-value">${receiptNumber}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Receipt Date:</span>
              <span class="info-value">${currentDate}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Payment Date:</span>
              <span class="info-value">${transactionDate}</span>
            </div>
          </div>

          <div class="divider"></div>

          <!-- Student Information -->
          <div class="section">
            <div class="section-title">Student Information</div>
            <div class="student-box">
              <div class="student-row">
                <span class="student-label">Name:</span>
                <span class="student-value">${studentInfo.name}</span>
              </div>
              <div class="student-row">
                <span class="student-label">Student ID:</span>
                <span class="student-value">${studentInfo.studentId}</span>
              </div>
              <div class="student-row">
                <span class="student-label">Total Fees:</span>
                <span class="student-value">${new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(totalFees)}</span>
              </div>
            </div>
          </div>

          <!-- Payment Information -->
          <div class="section">
            <div class="section-title">Payment Information</div>
            <div class="payment-details-box">
              <div class="payment-row">
                <span class="payment-label">Description:</span>
                <span class="payment-value">Monthly Fee Payment</span>
              </div>
              <div class="payment-row">
                <span class="payment-label">Payment Method:</span>
                <span class="payment-value">${
                  transaction.payment_method || "Online"
                }</span>
              </div>
              <div class="payment-row">
                <span class="payment-label">Amount Paid:</span>
                <span class="amount-paid">${formattedAmount}</span>
              </div>
              <div class="payment-row">
                <span class="payment-label">Status:</span>
                <span class="status-badge ${
                  transaction.status === "paid"
                    ? "status-paid"
                    : "status-pending"
                }">
                  ${transaction.status === "paid" ? "Paid" : "Pending"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="receipt-footer">
          <div class="footer-text">This is a computer-generated receipt. No signature required.</div>
          <div class="footer-thanks">Thank you for your payment!</div>
          <div class="footer-text" style="margin-top: 15px; font-size: 11px;">
            Mehtab Computer Academy | Contact: +91-XXXXXXXXXX | Email: info@mehtab.com
          </div>
        </div>
      </div>

      <script>
        window.print();
      </script>
    </body>
    </html>
  `;

  return html;
};

export const GenerateReceipt = (transaction, studentInfo, totalFees) => {
  const html = generateReceiptHTML(transaction, studentInfo, totalFees);
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const receiptNumber = `REC-${transaction.id}-${new Date()
    .getTime()
    .toString()
    .slice(-6)}`;
  link.href = url;
  link.download = `Receipt_${receiptNumber}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
