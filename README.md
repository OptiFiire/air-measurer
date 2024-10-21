# AirEval
AirEval is a simple Next.js-based web application that evaluates air quality parameters (PM2.5, temperature, humidity, TVOC, CO, CO2) and provides detailed AI-based recommendations and health impact assessments in markdown format. The application fetches air quality data and generates an AI response, then renders it beautifully.


## Features
- **Air Quality Evaluation**: Submit air quality parameters and receive a detailed breakdown with AI-generated insights.
- **Health and Safety Recommendations**: Get tailored recommendations based on air quality data, including evacuation advice and pollution source identification.
- **Markdown Rendering**: Responses are formatted using markdown for clean and structured output.
- **Next.js Framework**: Built with the power and flexibility of Next.js and MDX.


## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/aireval.git
   ```

2. Install dependencies:

   ```bash
   cd aireval
   npm install
   ```

3. Set up your OpenAI API key in a `.env.local` file:

   ```bash
   OPENAI_API_KEY=your_openai_key
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Visit the app on `http://localhost:3000`


## Usage
1. Navigate to the homepage.
2. Fill in the required air quality data (PM2.5, temperature, humidity, TVOC, CO, CO2).
3. Submit the form to receive an AI-evaluated report on air quality conditions.
4. The report will display on the page, formatted in markdown for easy readability.

## Contribution
Feel free to open issues, suggest features, or submit pull requests. Contributions are welcome!

## License
This project is licensed under the MIT License.