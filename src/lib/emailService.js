import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send application status update email to candidate
 */
export async function sendApplicationStatusEmail({
  candidateEmail,
  candidateName,
  jobTitle,
  companyName,
  status,
  employerEmail,
}) {
  try {
    let subject, htmlContent;

    if (status === "accepted") {
      subject = `🎉 Great News! Your application for ${jobTitle} has been accepted`;
      htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
    .button { display: inline-block; background: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Congratulations ${candidateName}!</h1>
    </div>
    <div class="content">
      <p>We're excited to inform you that your application for the <strong>${jobTitle}</strong> position at <strong>${companyName}</strong> has been <span style="color: #10b981; font-weight: bold;">ACCEPTED</span>!</p>
      
      <p>The employer would like to move forward with your application. They will contact you shortly to discuss the next steps, which may include:</p>
      
      <ul>
        <li>Scheduling an interview</li>
        <li>Additional screening or assessments</li>
        <li>Detailed discussion about the role</li>
      </ul>
      
      <p>Please keep an eye on your email and respond promptly to any communication from <strong>${companyName}</strong>.</p>
      
      <p style="margin-top: 30px;">
        <strong>What to do next:</strong><br>
        - Prepare for potential interview questions<br>
        - Research more about the company<br>
        - Have your references ready<br>
        - Be ready to discuss your experience and skills
      </p>
      
      <div style="text-align: center; margin-top: 30px;">
        <a href="mailto:${employerEmail}" class="button">Contact Employer</a>
      </div>
      
      <p style="margin-top: 30px; font-size: 14px; color: #6b7280;">
        Best of luck with the next steps! We're rooting for you! 🚀
      </p>
    </div>
    <div class="footer">
      <p>This is an automated message from Job Portal</p>
      <p>If you have any questions, please contact our support team</p>
    </div>
  </div>
</body>
</html>
      `;
    } else if (status === "rejected") {
      subject = `Update on your application for ${jobTitle}`;
      htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
    .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Application Update</h1>
    </div>
    <div class="content">
      <p>Dear ${candidateName},</p>
      
      <p>Thank you for your interest in the <strong>${jobTitle}</strong> position at <strong>${companyName}</strong> and for taking the time to apply.</p>
      
      <p>After careful consideration of all applications, we regret to inform you that we will not be moving forward with your application at this time. This decision was difficult as we received many qualified candidates.</p>
      
      <p>We encourage you to:</p>
      <ul>
        <li>Continue exploring other opportunities on our platform</li>
        <li>Keep your profile and resume updated</li>
        <li>Apply for future positions that match your skills</li>
        <li>Connect with employers in your field of interest</li>
      </ul>
      
      <p style="margin-top: 30px;">We truly appreciate your interest in this position and wish you all the best in your job search. We hope you'll continue to consider opportunities with companies on our platform.</p>
      
      <div style="text-align: center; margin-top: 30px;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/jobs" class="button">Browse More Jobs</a>
      </div>
      
      <p style="margin-top: 30px; font-size: 14px; color: #6b7280;">
        Keep going! Your perfect opportunity is out there! 💪
      </p>
    </div>
    <div class="footer">
      <p>This is an automated message from Job Portal</p>
      <p>If you have any questions, please contact our support team</p>
    </div>
  </div>
</body>
</html>
      `;
    } else {
      // For "reviewed" status
      subject = `Your application for ${jobTitle} is being reviewed`;
      htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
    .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Application Under Review</h1>
    </div>
    <div class="content">
      <p>Dear ${candidateName},</p>
      
      <p>We wanted to let you know that your application for the <strong>${jobTitle}</strong> position at <strong>${companyName}</strong> is currently being reviewed by the hiring team.</p>
      
      <p>We'll keep you updated on the progress of your application. If your qualifications match what we're looking for, we'll reach out to discuss the next steps.</p>
      
      <p style="margin-top: 30px;">Thank you for your patience!</p>
    </div>
    <div class="footer">
      <p>This is an automated message from Job Portal</p>
    </div>
  </div>
</body>
</html>
      `;
    }

    const data = await resend.emails.send({
      from: "Job Portal <noreply@yourjobportal.com>", // Change to your domain
      to: candidateEmail,
      subject: subject,
      html: htmlContent,
    });

    console.log("✅ Email sent successfully:", data);
    return { success: true, data };
  } catch (error) {
    console.error("❌ Email send failed:", error);
    return { success: false, error };
  }
}

/**
 * Send application confirmation to candidate
 */
export async function sendApplicationConfirmationEmail({
  candidateEmail,
  candidateName,
  jobTitle,
  companyName,
}) {
  try {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
    .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✅ Application Submitted Successfully!</h1>
    </div>
    <div class="content">
      <p>Dear ${candidateName},</p>
      
      <p>Your application for the <strong>${jobTitle}</strong> position at <strong>${companyName}</strong> has been successfully submitted!</p>
      
      <p><strong>What happens next:</strong></p>
      <ul>
        <li>The employer will review your application</li>
        <li>You'll receive an email update when there's a status change</li>
        <li>You can track your application status in your dashboard</li>
      </ul>
      
      <div style="text-align: center; margin-top: 30px;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard/candidate/applications" class="button">View My Applications</a>
      </div>
      
      <p style="margin-top: 30px; font-size: 14px; color: #6b7280;">
        Good luck with your application! 🍀
      </p>
    </div>
    <div class="footer">
      <p>This is an automated message from Job Portal</p>
    </div>
  </div>
</body>
</html>
    `;

    const data = await resend.emails.send({
      from: "Job Portal <noreply@yourjobportal.com>",
      to: candidateEmail,
      subject: `Application Received: ${jobTitle} at ${companyName}`,
      html: htmlContent,
    });

    console.log("✅ Confirmation email sent:", data);
    return { success: true, data };
  } catch (error) {
    console.error("❌ Confirmation email failed:", error);
    return { success: false, error };
  }
}

/**
 * Notify employer of new application
 */
export async function notifyEmployerNewApplication({
  employerEmail,
  employerName,
  candidateName,
  jobTitle,
  jobId,
}) {
  try {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
    .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎯 New Application Received!</h1>
    </div>
    <div class="content">
      <p>Hi ${employerName},</p>
      
      <p>You have a new application for your job posting: <strong>${jobTitle}</strong></p>
      
      <p><strong>Candidate:</strong> ${candidateName}</p>
      
      <p>Review the candidate's profile, resume, and application details in your employer dashboard.</p>
      
      <div style="text-align: center; margin-top: 30px;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard/employer/my-jobs" class="button">View Application</a>
      </div>
    </div>
    <div class="footer">
      <p>This is an automated message from Job Portal</p>
    </div>
  </div>
</body>
</html>
    `;

    const data = await resend.emails.send({
      from: "Job Portal <noreply@yourjobportal.com>",
      to: employerEmail,
      subject: `New Application: ${jobTitle}`,
      html: htmlContent,
    });

    console.log("✅ Employer notification sent:", data);
    return { success: true, data };
  } catch (error) {
    console.error("❌ Employer notification failed:", error);
    return { success: false, error };
  }
}