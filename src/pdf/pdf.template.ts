

import { format } from 'date-fns';

export const getPdfTemplate = (data: any): string => {
  const battery = data.battery;
  const purchasedDate = format(new Date(data.purchasedDate), 'dd-MM-yyyy');
  const warrantyExpiry = format(new Date(new Date(data.purchasedDate).getTime() + (battery.warranty_months * 30 * 24 * 60 * 60 * 1000)), 'dd-MM-yyyy');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>JAS Battery Official Warranty Certificate</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap');
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: linear-gradient(135deg, #1a365d 0%, #2c5282 50%, #3182ce 100%);
          color: #1a202c;
          padding: 20px;
          min-height: 100vh;
          line-height: 1.6;
        }
        
        .certificate-container {
          max-width: 850px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
          overflow: hidden;
          position: relative;
          border: 2px solid #e2e8f0;
        }
        
        .certificate-border {
          position: relative;
          background: linear-gradient(45deg, #d4af37, #ffd700, #d4af37, #b8860b);
          padding: 4px;
          border-radius: 20px;
        }
        
        .certificate-inner {
          background: white;
          border-radius: 16px;
          overflow: hidden;
        }
        
        .watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          font-size: 120px;
          color: rgba(0, 0, 0, 0.03);
          font-weight: bold;
          z-index: 1;
          pointer-events: none;
          font-family: 'Playfair Display', serif;
        }
        
        .header-section {
          background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%);
          color: white;
          padding: 40px 30px;
          text-align: center;
          position: relative;
          z-index: 2;
        }
        
        .header-decoration {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 8px;
          background: linear-gradient(90deg, #d4af37, #ffd700, #d4af37);
        }
        
        .company-logo {
          width: 140px;
          height: auto;
          margin: 0 auto 20px;
          display: block;
          background: white;
          padding: 15px;
          border-radius: 12px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          border: 3px solid #e2e8f0;
        }
        
        .certificate-title {
          font-family: 'Playfair Display', serif;
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 12px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          letter-spacing: 3px;
          text-transform: uppercase;
        }
        
        .certificate-subtitle {
          font-size: 18px;
          opacity: 0.95;
          margin-bottom: 15px;
          font-weight: 300;
          letter-spacing: 1px;
        }
        
        .company-details {
          background: rgba(255, 255, 255, 0.1);
          padding: 15px 20px;
          border-radius: 10px;
          margin: 20px auto 0;
          max-width: 400px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .company-name {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .company-tagline {
          font-size: 12px;
          opacity: 0.9;
          font-style: italic;
        }
        
        .certificate-number {
          position: absolute;
          top: 15px;
          right: 25px;
          background: rgba(255, 255, 255, 0.15);
          padding: 8px 15px;
          border-radius: 25px;
          font-size: 11px;
          font-family: 'Inter', monospace;
          font-weight: 500;
          border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(5px);
        }
        
        .content-section {
          padding: 45px 40px;
          background: #fafbfc;
          position: relative;
          z-index: 2;
        }
        
        .warranty-highlight {
          background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);
          color: white;
          padding: 20px 30px;
          border-radius: 50px;
          text-align: center;
          margin: 0 auto 35px;
          width: fit-content;
          font-size: 20px;
          font-weight: 700;
          box-shadow: 0 10px 25px rgba(197, 48, 48, 0.4);
          position: relative;
          overflow: hidden;
        }
        
        .warranty-highlight::before {
          content: '🛡️';
          margin-right: 12px;
          font-size: 24px;
        }
        
        .warranty-highlight::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transform: rotate(45deg);
          animation: shine 2s infinite;
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }
        
        .product-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin: 35px 0;
        }
        
        .product-card {
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
          border: 1px solid #e2e8f0;
          position: relative;
        }
        
        .product-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #3182ce, #4299e1);
          border-radius: 15px 15px 0 0;
        }
        
        .card-title {
          font-size: 16px;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
        }
        
        .card-title::before {
          content: '';
          width: 4px;
          height: 20px;
          background: #3182ce;
          margin-right: 10px;
          border-radius: 2px;
        }
        
        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #f1f5f9;
          transition: background-color 0.2s ease;
        }
        
        .detail-row:hover {
          background-color: #f8fafc;
          margin: 0 -15px;
          padding: 12px 15px;
          border-radius: 8px;
        }
        
        .detail-row:last-child {
          border-bottom: none;
        }
        
        .detail-label {
          font-weight: 500;
          color: #4a5568;
          font-size: 14px;
          min-width: 130px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        
        .detail-value {
          color: #1a202c;
          font-size: 16px;
          font-weight: 600;
          text-align: right;
        }
        
        .warranty-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 35px;
          border-radius: 15px;
          margin: 35px 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .warranty-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"><defs><pattern id="hexagons" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse"><polygon points="30,5 50,17.5 50,42.5 30,55 10,42.5 10,17.5" fill="none" stroke="white" stroke-width="1" opacity="0.1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23hexagons)"/></svg>');
          opacity: 0.3;
        }
        
        .warranty-title {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          margin-bottom: 20px;
          position: relative;
          font-weight: 700;
        }
        
        .warranty-period {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin-top: 25px;
          position: relative;
        }
        
        .date-card {
          background: rgba(255, 255, 255, 0.15);
          padding: 15px 25px;
          border-radius: 12px;
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          min-width: 140px;
        }
        
        .date-label {
          font-size: 12px;
          opacity: 0.9;
          margin-bottom: 5px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .date-value {
          font-size: 16px;
          font-weight: 700;
        }
        
        .description-section {
          background: white;
          padding: 30px;
          border-radius: 15px;
          margin: 30px 0;
          border-left: 6px solid #3182ce;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }
        
        .description-header {
          font-size: 20px;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          font-family: 'Playfair Display', serif;
        }
        
        .description-header::before {
          content: '📋';
          margin-right: 15px;
          font-size: 24px;
        }
        
        .description-text {
          line-height: 1.8;
          color: #4a5568;
          font-size: 15px;
        }
        
        .footer-section {
          background: #2d3748;
          color: white;
          padding: 30px;
          text-align: center;
          font-size: 13px;
          line-height: 1.8;
          position: relative;
        }
        
        .footer-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 15px;
          color: #e2e8f0;
        }
        
        .footer-content {
          opacity: 0.9;
          margin-bottom: 15px;
        }
        
        .footer-timestamp {
          font-style: italic;
          opacity: 0.7;
          font-size: 11px;
          margin-top: 15px;
          border-top: 1px solid #4a5568;
          padding-top: 15px;
        }
        
        .official-seal {
          position: absolute;
          bottom: 30px;
          right: 40px;
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, #d4af37, #ffd700, #b8860b);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          color: #2d3748;
          box-shadow: 0 8px 25px rgba(212, 175, 55, 0.5);
          text-align: center;
          line-height: 1.2;
          border: 4px solid white;
          text-transform: uppercase;
        }
        
        @media print {
          body {
            background: white;
            padding: 0;
          }
          .certificate-container {
            box-shadow: none;
            max-width: none;
            margin: 0;
          }
          .watermark {
            opacity: 0.8;
          }
        }
        
        @media (max-width: 768px) {
          .product-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .warranty-period {
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }
          
          .certificate-title {
            font-size: 28px;
          }
          
          .content-section,
          .product-card,
          .description-section,
          .warranty-section {
            padding: 25px;
          }
        }
      </style>
    </head>
    <body>
      <div class="certificate-container">
        <div class="certificate-border">
          <div class="certificate-inner">
            <div class="watermark">AUTHENTIC</div>
            
            <div class="header-section">
              <div class="header-decoration"></div>
              <div class="certificate-number">CERT-${battery.qr_code_id}</div>
              
              <img src="http://www.jasbattery.com/images/jaz-logo.png" 
                   alt="JAS Battery Solutions Logo" 
                   class="company-logo"
                   onerror="this.style.display='none'">
              
              <h1 class="certificate-title">Warranty Certificate</h1>
              <p class="certificate-subtitle">Official Product Warranty Documentation</p>
              
              <div class="company-details">
                <div class="company-name">JAS Battery Solutions Private Limited</div>
                <div class="company-tagline">Premium Energy Storage Solutions</div>
              </div>
            </div>
            
            <div class="content-section">
              <div class="warranty-highlight">
                ${battery.warranty_months} Months Premium Warranty
              </div>
              
              <div class="product-grid">
                <div class="product-card">
                  <h3 class="card-title">Product Information</h3>
                  <div class="detail-row">
                    <span class="detail-label">Product ID</span>
                    <span class="detail-value">${battery.qr_code_id}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Model Name</span>
                    <span class="detail-value">${battery.model_name}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Capacity</span>
                    <span class="detail-value">${battery.capacity_ah} AH</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Voltage</span>
                    <span class="detail-value">${battery.voltage}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Technology</span>
                    <span class="detail-value">${battery.technology}</span>
                  </div>
                </div>
                
                <div class="product-card">
                  <h3 class="card-title">Warranty Details</h3>
                  <div class="detail-row">
                    <span class="detail-label">Purchase Date</span>
                    <span class="detail-value">${purchasedDate}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Warranty Period</span>
                    <span class="detail-value">${battery.warranty_months} Months</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Valid Until</span>
                    <span class="detail-value">${warrantyExpiry}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Certificate Date</span>
                    <span class="detail-value">${format(new Date(), 'dd-MM-yyyy')}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Status</span>
                    <span class="detail-value" style="color: #38a169;">Active</span>
                  </div>
                </div>
              </div>
              
              <div class="warranty-section">
                <h3 class="warranty-title">Warranty Coverage Period</h3>
                <p style="margin-bottom: 20px; position: relative;">This certificate validates the manufacturer's warranty coverage for the specified product from the date of purchase through the expiration date listed below.</p>
                <div class="warranty-period">
                  <div class="date-card">
                    <div class="date-label">Coverage Starts</div>
                    <div class="date-value">${purchasedDate}</div>
                  </div>
                  <div class="date-card">
                    <div class="date-label">Coverage Expires</div>
                    <div class="date-value">${warrantyExpiry}</div>
                  </div>
                </div>
              </div>
              
              <div class="description-section">
                <h3 class="description-header">Product Description</h3>
                <p class="description-text">${battery.description}</p>
              </div>
              
              <div class="official-seal">
                Official<br>Warranty<br>Seal
              </div>
            </div>
            
            <div class="footer-section">
              <div class="footer-title">JAS Battery Solutions Private Limited</div>
              <div class="footer-content">
                This certificate is valid only with the original purchase receipt and serves as proof of warranty coverage.<br>
                For warranty claims and customer support, please contact our authorized service centers.<br>
                Keep this document safe for future reference and warranty service requirements.
              </div>
              <div class="footer-timestamp">
                Certificate generated on ${format(new Date(), 'dd-MM-yyyy')} at ${format(new Date(), 'HH:mm:ss')} IST
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};
