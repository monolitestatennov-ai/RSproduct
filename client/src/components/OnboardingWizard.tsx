import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, ChevronRight, MapPin, Target, TrendingUp } from 'lucide-react';

interface OnboardingWizardProps {
  onComplete?: () => void;
  onSkip?: () => void;
}

interface Step {
  id: number;
  title: string;
  description: string;
  icon: typeof MapPin;
  content: React.ReactNode;
}

function OnboardingWizard({ onComplete, onSkip }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Проверяем, проходил ли пользователь onboarding
    const hasCompletedOnboarding = localStorage.getItem('onboarding_completed');
    if (!hasCompletedOnboarding) {
      setIsVisible(true);
    }
  }, []);

  const steps: Step[] = [
    {
      id: 1,
      title: 'Добро пожаловать в RSpace!',
      description: 'Платформа для увеличения вашего дохода',
      icon: MapPin,
      content: (
        <div className="space-y-4">
          <p className="text-slate-600">
            RSpace помогает независимым риелторам увеличить доход в 2 раза за счёт цифровых сервисов.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm text-slate-700">Размещение объектов на всех классифайдах</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm text-slate-700">Ипотечные и юридические сервисы</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm text-slate-700">Кэшбэк от банков и страховых</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: 'Выберите ваш регион',
      description: 'Это поможет настроить сервисы под ваш рынок',
      icon: MapPin,
      content: (
        <div className="space-y-4">
          <p className="text-slate-600 mb-4">
            В каком регионе вы работаете?
          </p>
          <div className="grid grid-cols-2 gap-3">
            {['Москва', 'Санкт-Петербург', 'Тюмень', 'Екатеринбург', 'Новосибирск', 'Другой'].map((region) => (
              <Button
                key={region}
                variant="outline"
                className="h-auto py-3"
                onClick={() => {
                  localStorage.setItem('user_region', region);
                  handleNext();
                }}
              >
                {region}
              </Button>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: 'Ваши цели',
      description: 'Что для вас важно?',
      icon: Target,
      content: (
        <div className="space-y-4">
          <p className="text-slate-600 mb-4">
            Выберите ваши приоритеты (можно несколько):
          </p>
          <div className="space-y-2">
            {[
              { id: 'income', label: 'Увеличить доход' },
              { id: 'time', label: 'Сэкономить время' },
              { id: 'clients', label: 'Привлечь больше клиентов' },
              { id: 'automation', label: 'Автоматизировать процессы' },
            ].map((goal) => (
              <Button
                key={goal.id}
                variant="outline"
                className="w-full justify-start h-auto py-3"
                onClick={() => handleNext()}
              >
                {goal.label}
              </Button>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: 'Готово!',
      description: 'Начните использовать RSpace',
      icon: TrendingUp,
      content: (
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <p className="text-slate-600">
            Теперь вы можете начать использовать все возможности платформы!
          </p>
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="text-sm text-slate-700">Выберите сервисы для ваших объектов</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="text-sm text-slate-700">Отслеживайте свой прогресс в Dashboard</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="text-sm text-slate-700">Используйте калькулятор выгоды</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    localStorage.setItem('onboarding_completed', 'true');
    setIsVisible(false);
    onComplete?.();
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding_completed', 'true');
    setIsVisible(false);
    onSkip?.();
  };

  if (!isVisible) return null;

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-2 border-blue-200">
        <div className="p-6">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">
                Шаг {currentStep + 1} из {steps.length}
              </span>
              <Button variant="ghost" size="sm" onClick={handleSkip}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {currentStepData.title}
                </h3>
                <p className="text-sm text-slate-600">
                  {currentStepData.description}
                </p>
              </div>
            </div>

            <div className="mt-6">
              {currentStepData.content}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleSkip}
            >
              Пропустить
            </Button>
            <Button
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              onClick={handleNext}
            >
              {currentStep === steps.length - 1 ? 'Начать' : 'Далее'}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default OnboardingWizard;

