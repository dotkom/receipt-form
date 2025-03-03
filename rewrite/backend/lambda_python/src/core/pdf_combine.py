import io
from typing import Dict, List, Any
import requests

import reportlab.lib.pagesizes as pagesizes
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from PyPDF2 import PdfReader, PdfWriter
from core.data_types import Attachment


def _process_image(attachment_data: str, mime_type: str) -> PdfReader:
    """Process an image (JPEG or PNG) and convert it to a PDF page."""
    print(f"Processing {mime_type} attachment")

    # Create a new PDF with the image
    img_buffer = io.BytesIO()
    img_pdf = canvas.Canvas(img_buffer, pagesize=pagesizes.A4)

    response = requests.get(attachment_data)
    img_bytes = response.content

    img = ImageReader(io.BytesIO(img_bytes))

    # Calculate dimensions to fit on A4
    width, height = img.getSize()
    page_width, page_height = pagesizes.A4

    # Scale to fit page
    scale = min(page_width / width, page_height / height)
    new_width = width * scale
    new_height = height * scale

    # Center on page
    x = (page_width - new_width) / 2
    y = (page_height - new_height) / 2

    img_pdf.drawImage(img, x, y, width=new_width, height=new_height)
    img_pdf.save()

    img_buffer.seek(0)
    return PdfReader(img_buffer)


def merge_attachments(pdf_data: bytes, attachments: List[Attachment]) -> bytes:
    """Merge attachments with the main PDF."""
    # Create PDF writer for the output
    output_pdf = PdfWriter()

    # Add the front page
    front_page = PdfReader(io.BytesIO(pdf_data))
    output_pdf.add_page(front_page.pages[0])

    # Process each attachment
    for attachment in attachments:
        attachment_url = attachment.url
        mime_type = attachment.mime_type

        # Handle different file types
        if mime_type in ["image/jpeg", "image/jpg", "image/png"]:
            img_page = _process_image(attachment_url, mime_type)
            output_pdf.add_page(img_page.pages[0])
        elif mime_type == "application/pdf":
            # PDF files are not supported
            raise Exception("PDF files are not supported")
        else:
            raise Exception("Unsupported file type")

    # Save the complete PDF
    output_buffer = io.BytesIO()
    output_pdf.write(output_buffer)
    output_buffer.seek(0)
    return output_buffer.read()
