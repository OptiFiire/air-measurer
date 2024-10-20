import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export async function POST(req) {
  if (req.method !== "POST") {
    return new NextResponse(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const { pm25, temperature, humidity, tvoc, co, co2 } = await req.json();

    const prompt = `
      Evaluate the air quality for each variable and provide feedback indicating whether the levels are perfect, suitable, moderately high/low, dangerously high/low, hazardous :
      - PM2.5: ${pm25} µg/m³
      - Temperature: ${temperature} °C
      - Humidity: ${humidity} %
      - TVOC: ${tvoc} µg/m³
      - CO: ${co} ppm
      - CO2: ${co2} ppm

      Explain any potential health risks or recommendations for improving the air quality, if necessary.
    `;

    const stream = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-instruct",
      messages: [{ role: "user", content: prompt }],
      stream: true,
    });

    let generatedText = '';
    for await (const chunk of stream) {
      generatedText += chunk.choices[0]?.delta?.content || "";
    }

    return NextResponse.json({ message: generatedText });
  } catch (error) {
    console.error('Error generating response from OpenAI:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to generate response' }), { status: 500 });
  }
}
