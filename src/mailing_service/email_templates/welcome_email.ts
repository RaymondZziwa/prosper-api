export async function welcomeEmailTemplate(
  firstName: string,
  lastName: string,
) {
  return `
    Dear ${firstName} ${lastName},
      
    We're excited to have you join our platform dedicated to showcasing and connecting talented football players like yourself. Whether you're a seasoned athlete or just starting your football journey, we believe your unique skills and passion for the game will shine on our platform.
    
    Here's how you can kick off your experience:
    
    ▶ Complete Your Football Profile:
       Ensure your football profile is complete with all the relevant details – your playing position, skills, achievements, and more. This will help you stand out and attract the right opportunities.
    
    ▶ Explore Football Opportunities:
       Dive into the platform and explore the diverse range of football opportunities available. From scouting events to club trials, our platform offers tailored opportunities that match your football skills and interests.
    
    ▶ Stay Informed about Football Events:
       Keep an eye on our newsletters and announcements to stay updated on the latest football events, trials, and opportunities within the Prosper Football Agency community.
    
    If you have any questions or need assistance, our support team is here to help. Feel free to reach out to [support@prosperfootballagency.com].
    
    Once again, welcome aboard! We can't wait to see your skills in action on our platform.
    
    Best regards,
    
    Zziwa Raymond Ian
    Co-founder
    Prosper Football Agency
    `;
}
