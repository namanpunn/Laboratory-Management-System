'use client'
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
export default function Page() {
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  const plans = [
    {
      name: 'Basic',
      monthlyPrice: 49,
      yearlyPrice: 490,
      features: [
        'Data Management',
        'Sample Tracking',
        'Basic Analytics',
        'Email Support',
        '1 User Account',
      ],
      highlighted: false,
      cta: 'Get Started',
      icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
    },
    {
      name: 'Professional',
      monthlyPrice: 99,
      yearlyPrice: 990,
      features: [
        'Everything in Basic',
        'Workflow Automation',
        'Real-time Analysis',
        'Priority Support',
        'Up to 5 User Accounts',
      ],
      highlighted: true,
      cta: 'Try Professional',
      icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    },
    {
      name: 'Enterprise',
      monthlyPrice: 249,
      yearlyPrice: 2490,
      features: [
        'Everything in Professional',
        'Custom Integrations',
        'Advanced Analytics',
        'Dedicated Account Manager',
        'Unlimited User Accounts',
      ],
      highlighted: false,
      cta: 'Contact Sales',
      icon: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2'
    }
  ];

  const faqs = [
    {
      question: "How does the billing work?",
      answer: "You can choose between monthly or annual billing. Annual billing offers a 17% discount compared to monthly billing."
    },
    {
      question: "Can I change my plan later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes, we offer a 14-day free trial for all plans. No credit card required to start your trial."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for annual enterprise plans."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      
      <Head>
        <title>Pricing - Laboratory Information Management System</title>
        <meta name="description" content="Pricing plans for our Next-Gen Laboratory Information Management System" />
      </Head>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <span className="inline-block px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full mb-4">
            Pricing
          </span>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            The Right Plan for Your Lab
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the perfect plan to streamline operations, enhance data management, 
            and elevate research capabilities for your laboratory.
          </p>
          
          {/* Billing period toggle */}
          <div className="inline-flex items-center p-1 rounded-lg border border-gray-300 bg-white shadow-sm">
            <button
              className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                billingPeriod === 'monthly' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setBillingPeriod('monthly')}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                billingPeriod === 'yearly' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setBillingPeriod('yearly')}
            >
              Yearly <span className="inline-block ml-1 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">Save 17%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                plan.highlighted 
                  ? 'ring-2 ring-blue-600 relative translate-y-0 md:-translate-y-4' 
                  : ''
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 inset-x-0 text-center bg-blue-600 text-white py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className={`p-8 ${plan.highlighted ? 'pt-12' : ''}`}>
                <div className="flex items-center mb-4">
                  <div className={`p-2 rounded-lg ${plan.highlighted ? 'bg-blue-100' : 'bg-gray-100'} mr-3`}>
                    <svg 
                      className={`h-6 w-6 ${plan.highlighted ? 'text-blue-600' : 'text-gray-700'}`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={plan.icon} />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                </div>
                
                <div className="mt-6">
                  <span className="text-5xl font-extrabold text-gray-900">
                    ${billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                  </span>
                  <span className="ml-2 text-xl font-medium text-gray-500">
                    /{billingPeriod === 'monthly' ? 'mo' : 'yr'}
                  </span>
                  <p className="mt-1 text-sm text-gray-500">
                    {billingPeriod === 'yearly' ? 'Billed annually' : 'Billed monthly'}
                  </p>
                </div>
                
                <div className="mt-8 mb-8 border-t border-b border-gray-100 py-6">
                  <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">What's included</h4>
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <svg 
                          className={`h-5 w-5 ${plan.highlighted ? 'text-blue-500' : 'text-green-500'} shrink-0 mr-3 mt-0.5`}
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button
                  className={`w-full px-4 py-3 rounded-lg font-medium transition-colors text-base ${
                    plan.highlighted
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Custom Solution */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl shadow-xl p-12 text-center text-white mb-24">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:text-left">
              <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
              <p className="text-lg text-blue-100 max-w-2xl">
                We understand that every laboratory has unique requirements. Let our experts design a tailor-made solution for your specific needs.
              </p>
            </div>
            <button className="inline-flex items-center px-6 py-4 bg-white text-blue-700 rounded-xl hover:bg-blue-50 transition-colors font-medium shadow-lg">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Sales
            </button>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          
        </div>
      </main>
    </div>
  );
}