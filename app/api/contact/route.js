export async function POST(request) {
    const body = await request.json();
    
    // Replace this with your Discord webhook URL
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    
    if (!webhookUrl) {
      return new Response('Discord webhook URL not configured', { status: 500 });
    }
  
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });
  
      if (!response.ok) throw new Error('Failed to send to Discord');
      
      return new Response('Message sent successfully', { status: 200 });
    } catch (error) {
      console.error('Error:', error);
      return new Response('Error sending message', { status: 500 });
    }
  }
  