"use client"

import { Button, Divider } from '@nextui-org/react';
import { Input } from '@nextui-org/input'
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Atom, Flame, Search, SendHorizonal, Sprout, Thermometer, TriangleAlert, Waves } from 'lucide-react';

export default function Home() {
  const [formData, setFormData] = useState({
    pm25: '',
    temperature: '',
    humidity: '',
    tvoc: '',
    co: '',
    co2: '',
  });

  const [formErrors, setFormErrors] = useState({
    pm25: '',
    temperature: '',
    humidity: '',
    tvoc: '',
    co: '',
    co2: '',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setFormErrors({
      ...formErrors,
      [name]: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (value === '') {
        errors[key] = 'This field is required.';
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      setResult(data.message);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error('Error making API request', err);
    }
  };

  const inputFields = [
    { label: 'PM2.5 (µg/m³)', name: 'pm25', placeholder: 'PM2.5', icon: (<Atom size={20} className='text-lime-100/50' />) },
    { label: 'Temperature (°C)', name: 'temperature', placeholder: 'Temperature', icon: (<Thermometer size={20} className='text-lime-100/50' />) },
    { label: 'Humidity (%)', name: 'humidity', placeholder: 'Humidity', icon: (<Waves size={20} className='text-lime-100/50' />) },
    { label: 'TVOC (µg/m³)', name: 'tvoc', placeholder: 'TVOC', icon: (<TriangleAlert size={20} className='text-lime-100/50' />) },
    { label: 'CO (ppm)', name: 'co', placeholder: 'CO', icon: (<Flame size={20} className='text-lime-100/50' />) },
    { label: 'CO2 (ppm)', name: 'co2', placeholder: 'CO2', icon: (<Sprout size={20} className='text-lime-100/50' />) },
  ];

  return (
    <main className='container mx-auto flex items-center justify-center min-h-screen'>
      <div className='flex flex-row items-center min-h-screen w-full justify-center'>

        <div className={`h-full w-full flex justify-center items-center flex-col ${result ? 'py-16' : ''}`}>

          <div>
            <h1 className='text-4xl font-medium text-lime-800 text-center'>AI Air Quality Evaluator</h1>
            <h1 className='text-md font-medium text-lime-800/50 mb-8 text-center'>Managed by ASK sophomores</h1>
          </div>

          <div className='flex gap-8 md:flex-row justify-center items-center flex-col w-full'>

            <form onSubmit={handleSubmit} className='space-y-2 w-[80%] md:w-[40%] lg:w-[30%]'>

              {inputFields.map((field) => (
                <Input
                  isRequired
                  key={field.name}
                  type="text"
                  label={field.label}
                  name={field.name}
                  isInvalid={!!formErrors[field.name]}
                  value={formData[field.name]}
                  errorMessage={formErrors[field.name]}
                  startContent={field.icon}
                  placeholder={`Enter ${field.placeholder} value...`}
                  classNames={{
                    label: "dark:text-white",
                    input: [
                      "dark:text-white",
                      "dark:placeholder-lime-100/50",
                    ],
                    inputWrapper: [
                      "shadow-xl",
                      "dark:text-white/90",
                      "bg-lime-800/70",
                      "backdrop-blur-lg",
                      "dark:placeholder-lime-500",
                      "dark:hover:bg-lime-800/60",
                      "group-data-[focus=true]:bg-lime-800/60",
                      "!cursor-text",
                    ],
                  }}
                  onChange={handleChange}
                  onPaste={(event) => {
                    event.preventDefault();
                  }}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
              ))
              }

              <Button type="submit" className='bg-lime-800 w-full' disabled={loading}>
                {loading ? 'Checking...' : 'Check'}
                <Search size={16} />
              </Button>
            </form>

            {result && (
              <div className='bg-lime-800 border border-lime-500 rounded-2xl overflow-y-auto h-[424px] w-[80%] md:w-[40%] lg:w-[30%] px-4 py-2'>
                <div className='flex flex-row gap-2 items-center pt-2'>
                  <div className='rounded-full bg-lime-500 size-2'></div>
                  <div className='rounded-full bg-lime-500 size-2'></div>
                  <div className='rounded-full bg-lime-500 size-2'></div>
                </div>
                <Divider className='my-2 bg-lime-500 h-[1px]' />
                <div className='text-lime-100'>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{result}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main >
  );
}
