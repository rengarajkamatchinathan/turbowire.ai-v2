import Lookup from '@/data/Lookup';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Zap, Star, Crown, Infinity } from 'lucide-react';

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

  const getIcon = (index) => {
    const icons = [Zap, Star, Crown, Infinity];
    return icons[index] || Zap;
  };

  const getGradient = (index) => {
    const gradients = [
      'from-blue-400 to-blue-600',
      'from-green-400 to-green-600', 
      'from-purple-400 to-purple-600',
      'from-orange-400 to-orange-600'
    ];
    return gradients[index] || gradients[0];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
      {Lookup.PRICING_OPTIONS.map((pricing, index) => {
        const IconComponent = getIcon(index);
        const gradient = getGradient(index);
        const isPopular = index === 2; // Pro plan
        
        return (
          <div
            key={index}
            className={`relative ${isPopular ? 'cyber-border' : 'glass-panel'} p-6 h-full flex flex-col`}
          >
            {isPopular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="neon-btn-orange px-4 py-1 text-xs rounded-full">
                  MOST POPULAR
                </div>
              </div>
            )}
            
            <div className="text-center mb-6">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center`}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">{pricing.name}</h3>
              <p className="text-gray-400 text-sm">{pricing.desc}</p>
            </div>

            <div className="text-center mb-6">
              <div className="text-4xl font-bold neon-text-blue mb-2">
                ${pricing.price}
              </div>
              <div className="text-lg text-gray-300 mb-1">
                {pricing.tokens} Tokens
              </div>
              <div className="text-sm text-gray-500">
                One-time purchase
              </div>
            </div>

            <div className="space-y-3 mb-6 flex-1">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Instant token delivery</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>No expiration</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>24/7 support</span>
              </div>
              {index >= 2 && (
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Priority processing</span>
                </div>
              )}
            </div>

            {userDetail && (
              <div
                onClick={() => {
                  setSelectedOption(pricing);
                  console.log(pricing);
                }}
                className="mt-auto"
              >
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
            
            {!userDetail && (
              <button className="neon-btn-blue w-full py-3 rounded-lg mt-auto">
                Sign in to purchase
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default PricingModel;