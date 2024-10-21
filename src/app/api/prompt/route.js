import axios from 'axios';
import { NextResponse } from 'next/server';

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

        const request = await axios({
            method: 'POST',
            url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINIAI_KEY}`,
            data: { "contents": [{ "parts": [{ "text": prompt }] }] }
        });

        const data = await request.data.candidates[0].content.parts[0].text;

        return NextResponse.json({ message: data });
    } catch (error) {
        console.error('Error generating response from OpenAI:', error);
        return new NextResponse(JSON.stringify({ error: 'Failed to generate response' }), { status: 500 });
    }
}
