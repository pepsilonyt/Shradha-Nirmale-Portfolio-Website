import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const recipient = 'stevera98@gmail.com';
    const subject = `New Diagnostic Form Submission - ${data.name || 'Anonymous'}`;

    // Construct a premium HTML email body
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${subject}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: #f9f9f9; color: #333333; margin: 0; padding: 20px; }
            .container { max-width: 600px; background-color: #ffffff; border-radius: 16px; border: 1px solid #eaeaea; box-shadow: 0 4px 12px rgba(0,0,0,0.02); overflow: hidden; margin: 0 auto; }
            .header { background-color: #2563EB; color: #ffffff; padding: 24px; text-align: center; }
            .header h1 { margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; }
            .content { padding: 32px; }
            .section-title { font-size: 14px; font-weight: 700; text-transform: uppercase; color: #2563EB; border-bottom: 1px solid #eaeaea; padding-bottom: 8px; margin-top: 24px; margin-bottom: 16px; letter-spacing: 0.5px; }
            .data-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
            .data-table td { padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px; vertical-align: top; }
            .data-table td.label { font-weight: 600; color: #666666; width: 40%; }
            .data-table td.value { color: #111111; }
            .footer { background-color: #fcfcfc; padding: 20px; text-align: center; border-t: 1px solid #eaeaea; font-size: 11px; color: #999999; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Diagnostics Form submission</h1>
            </div>
            <div class="content">
              <p style="font-size: 15px; line-height: 1.5; margin-bottom: 24px;">A visitor has completed the diagnostics funnel on Shradha Nirmale's portfolio website. Here are the details:</p>
              
              <div class="section-title">Lead Information</div>
              <table class="data-table">
                <tr>
                  <td class="label">Full Name</td>
                  <td class="value">${data.name || 'N/A'}</td>
                </tr>
                <tr>
                  <td class="label">Email Address</td>
                  <td class="value"><a href="mailto:${data.email}">${data.email || 'N/A'}</a></td>
                </tr>
                <tr>
                  <td class="label">Phone Number</td>
                  <td class="value">${data.phone || 'N/A'}</td>
                </tr>
                <tr>
                  <td class="label">Timezone</td>
                  <td class="value">${data.timezone || 'N/A'}</td>
                </tr>
                <tr>
                  <td class="label">Selected Track</td>
                  <td class="value" style="text-transform: uppercase; font-weight: bold; color: #2563EB;">${data.track || 'N/A'}</td>
                </tr>
              </table>

              <div class="section-title">Diagnostics Data (${(data.track || '').toUpperCase()})</div>
              <table class="data-table">
                ${
                  data.track === 'celpip'
                    ? `
                  <tr>
                    <td class="label">Target Band Score</td>
                    <td class="value">${data.celpipTargetScore || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td class="label">Expected Exam Date</td>
                    <td class="value">${data.celpipExamDate || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td class="label">Current Level Estimate</td>
                    <td class="value">${data.celpipCurrentLevel || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td class="label">Weakest Skills</td>
                    <td class="value">${Array.isArray(data.celpipWeakestSkill) ? data.celpipWeakestSkill.join(', ') : data.celpipWeakestSkill || 'N/A'}</td>
                  </tr>
                `
                    : ''
                }
                ${
                  data.track === 'det'
                    ? `
                  <tr>
                    <td class="label">Target DET Score</td>
                    <td class="value">${data.detTargetScore || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td class="label">Estimated Test Date</td>
                    <td class="value">${data.detTestDate || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td class="label">Preparation Status</td>
                    <td class="value">${data.detPrepStatus || 'N/A'}</td>
                  </tr>
                `
                    : ''
                }
                ${
                  data.track === 'corporate'
                    ? `
                  <tr>
                    <td class="label">Professional Role / Title</td>
                    <td class="value">${data.corporateRole || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td class="label">Industry</td>
                    <td class="value">${data.corporateIndustry || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td class="label">Key Communication Challenges</td>
                    <td class="value">${Array.isArray(data.corporateChallenge) ? data.corporateChallenge.join(', ') : data.corporateChallenge || 'N/A'}</td>
                  </tr>
                `
                    : ''
                }
                <tr>
                  <td class="label">Additional Message / Goals</td>
                  <td class="value">${data.message || 'N/A'}</td>
                </tr>
              </table>
            </div>
            <div class="footer">
              This submission was processed automatically via Shradha N. Portfolio diagnostics funnel API.
            </div>
          </div>
        </body>
      </html>
    `;

    // 1. Resend API support
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'Portfolio Funnel <onboarding@resend.dev>', // Resend sandbox default sender
          to: recipient,
          subject: subject,
          html: htmlContent,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Resend API Error details:', errorText);
        throw new Error('Resend email dispatch failed');
      }

      return NextResponse.json({ success: true, method: 'resend' });
    }

    // 2. Fail-safe Development Mockup Logging (if API keys aren't set in Vercel yet)
    console.log('--- Mock Diagnostic Submission Email ---');
    console.log(`To: ${recipient}`);
    console.log(`Subject: ${subject}`);
    console.log(`Data:`, data);
    console.log('----------------------------------------');

    return NextResponse.json({
      success: true,
      method: 'mock',
      warning: 'Email was logged in Vercel/dev console because RESEND_API_KEY environment variable is not configured.',
    });
  } catch (error: any) {
    console.error('Error dispatching diagnostic form email:', error);
    return NextResponse.json({ error: 'Internal Server Error dispatching email' }, { status: 500 });
  }
}
