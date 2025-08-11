import { Injectable, NotFoundException } from '@nestjs/common';
import * as htmlToPdf from 'html-pdf-node';
import { getPdfTemplate } from './pdf.template';
import { DeviceDetailsService } from '../device-details/device-details.service'; // Import your existing service

@Injectable()
export class PdfService {
  constructor(private readonly deviceDetailsService: DeviceDetailsService) {} // Inject your existing service

  async generatePdf(id: number): Promise<Buffer> {
    // Call your existing service function to fetch the data
    const result = await this.deviceDetailsService.fetchingSpecificDeviceDetails(id);

    const data = result?.device;
    
    // If no data is found, throw an error
    if (!data) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }

    // Generate the HTML content using our new template
    const htmlContent = getPdfTemplate(data);

    // Create a file object for html-pdf-node
    const file = { content: htmlContent };

    // Set options for the PDF generation
    const options = { 
      format: 'A4',
      printBackground: true, // This is important for CSS background colors
    };

    // Generate the PDF buffer
    const pdfBuffer = await htmlToPdf.generatePdf(file, options);
    
    return pdfBuffer;
  }
}