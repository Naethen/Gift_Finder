'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuiz } from '@/hooks/useQuiz';
import { OCCASIONS, RELATIONSHIPS, INTERESTS, PRICE_RANGES } from '@/data/constants';

export default function GiftQuizForm() {
  const { handleQuizSubmit, isSubmitting, error } = useQuiz();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    budget: PRICE_RANGES.MODERATE,
    occasion: '',
    recipientAge: 25,
    relationship: '',
    interests: [] as string[],
    gender: ''
  });

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return formData.budget.min >= 0 && formData.budget.max > formData.budget.min;
      case 2:
        return formData.occasion && formData.relationship;
      case 3:
        return formData.recipientAge > 0 && formData.recipientAge < 120;
      case 4:
        return formData.interests.length > 0;
      default:
        return true;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateCurrentStep()) {
      await handleQuizSubmit(formData);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold mb-4">What's your budget?</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(PRICE_RANGES).map(([range, { min, max }]) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, budget: { min, max } }))}
                  className={`p-4 rounded-lg border ${
                    formData.budget.min === min && formData.budget.max === max
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="font-medium">{range}</div>
                  <div className="text-sm text-gray-500">${min} - ${max}</div>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-semibold mb-4">What's the occasion?</h2>
              <select
                value={formData.occasion}
                onChange={(e) => setFormData(prev => ({ ...prev, occasion: e.target.value }))}
                className="w-full p-2 border rounded"
              >
                <option value="">Select an occasion</option>
                {OCCASIONS.map(occasion => (
                  <option key={occasion} value={occasion}>{occasion}</option>
                ))}
              </select>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">What's your relationship with them?</h2>
              <select
                value={formData.relationship}
                onChange={(e) => setFormData(prev => ({ ...prev, relationship: e.target.value }))}
                className="w-full p-2 border rounded"
              >
                <option value="">Select relationship</option>
                {RELATIONSHIPS.map(relation => (
                  <option key={relation} value={relation}>{relation}</option>
                ))}
              </select>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-semibold mb-4">How old are they?</h2>
              <input
                type="number"
                value={formData.recipientAge}
                onChange={(e) => setFormData(prev => ({ ...prev, recipientAge: parseInt(e.target.value) }))}
                min="0"
                max="120"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Gender (Optional)</h2>
              <div className="grid grid-cols-3 gap-4">
                {['Male', 'Female', 'Other'].map(gender => (
                  <button
                    key={gender}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, gender }))}
                    className={`p-2 rounded border ${
                      formData.gender === gender
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200'
                    }`}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold mb-4">What are their interests?</h2>
            <div className="grid grid-cols-2 gap-2">
              {INTERESTS.map(interest => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      interests: prev.interests.includes(interest)
                        ? prev.interests.filter(i => i !== interest)
                        : [...prev.interests, interest]
                    }));
                  }}
                  className={`p-2 rounded border ${
                    formData.interests.includes(interest)
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-200'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </motion.div>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {renderStep()}

      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}

      <div className="flex justify-between mt-8">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Back
          </button>
        )}

        {currentStep < 4 ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={!validateCurrentStep()}
            className="ml-auto px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting || !validateCurrentStep()}
            className="ml-auto px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
          >
            {isSubmitting ? 'Finding Gifts...' : 'Find Gifts'}
          </button>
        )}
      </div>
    </form>
  );
}
