import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { documentUrl, isFileUpload } = await request.json()

    if (!documentUrl) {
      return NextResponse.json({ error: "Document URL is required" }, { status: 400 })
    }

    // For demo purposes, we'll return simulated extracted text
    // In production, you would use libraries like:
    // - pdf-parse for PDFs
    // - mammoth for DOCX files
    // - Or cloud services like Google Document AI, AWS Textract

    const extractedText = `
    NATIONAL PARIVAR MEDICLAIM PLUS POLICY - TERMS AND CONDITIONS

    1. DEFINITIONS
    - Hospital: Institution with minimum 10-15 inpatient beds, qualified nursing staff, medical practitioners available 24/7, fully equipped operation theatre, and daily patient records.
    - Pre-existing Disease: Any condition, ailment, injury or disease diagnosed by a physician or for which medical advice or treatment was recommended or received within 48 months prior to policy inception.

    2. COVERAGE DETAILS
    This policy provides coverage for:
    - Inpatient hospitalization expenses
    - Pre and post hospitalization expenses (30-60 days)
    - Day care procedures
    - Emergency ambulance charges
    - AYUSH treatments (Ayurveda, Yoga, Naturopathy, Unani, Siddha, Homeopathy)
    - Organ donor expenses
    - Maternity and newborn baby expenses

    3. WAITING PERIODS
    - Pre-existing diseases: 36 months continuous coverage required
    - Specific diseases (cataract, hernia, etc.): 24 months
    - Cataract surgery: 2 years waiting period
    - Maternity benefits: 24 months continuous coverage

    4. PREMIUM AND GRACE PERIOD
    - Grace period: 30 days for premium payment after due date
    - Policy continues without break in coverage during grace period
    - Late payment may attract additional charges

    5. NO CLAIM DISCOUNT (NCD)
    - 5% discount on base premium for claim-free year
    - Maximum NCD: 50% of base premium
    - NCD applicable only on base premium, not on loading

    6. SUB-LIMITS AND CO-PAYMENTS
    Plan A Limits:
    - Room rent: 1% of Sum Insured per day
    - ICU charges: 2% of Sum Insured per day
    - Surgeon fees: As per policy schedule
    - Anesthetist fees: 25% of surgeon fees

    7. MATERNITY COVERAGE
    - Covers normal delivery, cesarean section, complications
    - Waiting period: 24 months
    - Maximum 2 deliveries per policy period
    - Newborn baby covered from day 1

    8. EXCLUSIONS
    - Cosmetic surgery
    - Dental treatment (unless due to accident)
    - Treatment outside India
    - War and nuclear risks
    - Self-inflicted injuries

    9. CLAIM PROCEDURE
    - Intimation within 24 hours for planned hospitalization
    - Submit complete documents within 30 days of discharge
    - Cashless facility available at network hospitals

    10. PREVENTIVE HEALTH CHECK-UP
    - Available after 2 continuous claim-free years
    - Amount as specified in policy schedule
    - Must be done at approved diagnostic centers
    `

    return NextResponse.json({
      extractedText,
      success: true,
      metadata: {
        documentType: isFileUpload ? "Uploaded File" : "URL Document",
        extractionMethod: "Simulated OCR",
        textLength: extractedText.length,
      },
    })
  } catch (error) {
    console.error("Error extracting text:", error)
    return NextResponse.json(
      {
        error: "Failed to extract text from document",
        details: error instanceof Error ? error.message : "Unknown error",
        success: false,
      },
      { status: 500 },
    )
  }
}
