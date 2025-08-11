import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { Response } from 'express';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get(':id')
  async getPdf(@Param('id') id: string, @Res({ passthrough: true }) res: Response): Promise<StreamableFile> {
    const pdfBuffer = await this.pdfService.generatePdf(parseInt(id, 10));
    
    // Set headers for the file download
    res.set({
      'Content-Disposition': `attachment; filename="product-details-${id}.pdf"`,
      'Content-Type': 'application/pdf',
    });
    
    return new StreamableFile(pdfBuffer);
  }
}