import Lookup from '@/data/Lookup';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Zap, Crown, Star, Rocket } from 'lucide-react';

function PricingModel() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [selectedOption, setSelectedOption] = useState();

  const UpdateToken = useMutation(api.users.UpdateToken);
  
  useEffect(() => {
    console.log(userDetail);
  }, [userDetail]);

  const onPaymentSuccess = async (pric, usr) => {
    console.log(selectedOption);
    console.log(pric);
    console.log(usr);
    const token = Number(usr?.token) + Number(pric?.value);
    console.log(token);
    await UpdateToken({
      token: token,
      userId: userDetail?._id,
    });
  };

  const planIcons = [Zap, Crown, Star, Rocket];
  const planColors = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500', 
    'from-orange-500 to-red-500',
    'from-green-500 to-emerald-500'
  ];

  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Lookup.PRICING_OPTIONS.map((pricing, index) => {
        const Icon = planIcons[index];
        const colorClass = planColors[index];
        const isPopular = index === 1; // Make second plan popular
        
        return (
          <div
            key={index}
            className={`relative flex flex-col gap-6 glass p-8 rounded-2xl border transition-all duration-300 hover-lift group ${
              isPopular 
                ? 'border-[#1b76ff] shadow-lg shadow-[#1b76ff]/25 scale-105' 
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            {/* Popular Badge */}
            {isPopular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-[#1b76ff] to-[#35c5ff] px-4 py-2 rounded-full">
                  <span className="text-white text-sm font-bold flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </span>
                </div>
              </div>
            )}

            {/* Plan Header */}
            <div className="text-center">
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${colorClass} mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h2 className="font-bold text-2xl text-white mb-2">{pricing.name}</h2>
              <p className="text-gray-400 text-sm">{pricing.desc}</p>
            </div>

            {/* Tokens */}
            <div className="text-center py-4 border-y border-white/10">
              <div className="text-3xl font-bold text-white mb-1">
                {pricing.tokens.toLocaleString()}
              </div>
              <div className="text-gray-400 text-sm">Tokens</div>
            </div>

            {/* Price */}
            <div className="text-center">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold neon-text-orange">
                  ${pricing.price}
                </span>
                <span className="text-gray-400">USD</span>
              </div>
              <div className="text-gray-400 text-sm mt-1">One-time purchase</div>
            </div>

            {/* Features */}
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-2 h-2 bg-gradient-to-r from-[#1b76ff] to-[#35c5ff] rounded-full"></div>
                <span>AI Code Generation</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-2 h-2 bg-gradient-to-r from-[#1b76ff] to-[#35c5ff] rounded-full"></div>
                <span>Real-time Preview</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-2 h-2 bg-gradient-to-r from-[#1b76ff] to-[#35c5ff] rounded-full"></div>
                <span>Export & Download</span>
              </div>
              {index >= 1 && (
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#1b76ff] to-[#35c5ff] rounded-full"></div>
                  <span>Priority Support</span>
                </div>
              )}
              {index >= 2 && (
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#1b76ff] to-[#35c5ff] rounded-full"></div>
                  <span>Advanced Templates</span>
                </div>
              )}
            </div>

            {/* Payment Button */}
            {userDetail && (
              <div className="mt-6">
                <PayPalButtons
                  style={{ 
                    layout: 'vertical',
                    color: 'blue',
                    shape: 'rect',
                    label: 'pay'
                  }}
                  disabled={!userDetail}
                  onCancel={() => console.log('payment cancel')}
                  onClick={() => {
                    setSelectedOption(pricing);
                    console.log(pricing);
                  }}
                  onApprove={() => {
                    setSelectedOption(pricing);
                    console.log(pricing);
                    let pric = pricing;
                    let usr = userDetail;
                    onPaymentSuccess(pric, usr);
                  }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: pricing.price,
                            currency_code: 'USD',
                          },
                        },
                      ],
                    });
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default PricingModel;