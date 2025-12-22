import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Menu, TrendingUp, Clock, DollarSign, Gift, Bell } from 'lucide-react';
import EarningsCalculator from '@/components/EarningsCalculator';
import Notifications, { useNotifications } from '@/components/Notifications';
import OnboardingWizard from '@/components/OnboardingWizard';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  margin: number;
  bonus: number;
  color: string;
  bgGradient: string;
  illustration: string;
  recommended: boolean;
  status: 'select' | 'ready';
  details: Array<{ title: string; description: string }>;
}

const allServices: Service[] = [
  {
    id: 'owner-check',
    name: 'Проверка собственника',
    description: 'Проверка юридической чистоты объекта недвижимости',
    price: 5000,
    margin: 0,
    bonus: 250,
    color: 'blue',
    bgGradient: 'from-cyan-400 to-blue-500',
    illustration: '🛡️',
    recommended: true,
    status: 'select',
    details: [
      { title: 'Полная проверка', description: 'Проверка всех документов и истории объекта' },
      { title: 'Юридическая экспертиза', description: 'Анализ рисков и правовых аспектов' },
    ],
  },
  {
    id: 'mortgage-pro',
    name: 'Ипотека PRO',
    description: 'Профессиональное сопровождение ипотечной сделки',
    price: 50000,
    margin: 25000,
    bonus: 2500,
    color: 'purple',
    bgGradient: 'from-purple-400 to-purple-500',
    illustration: '🏦',
    recommended: false,
    status: 'select',
    details: [
      { title: 'Подбор банка', description: 'Выбор оптимального банка и условий' },
      { title: 'Сбор документов', description: 'Помощь в подготовке всех необходимых документов' },
    ],
  },
  {
    id: 'ai-lawyer',
    name: 'AI-юрист',
    description: 'Автоматическое составление договоров с помощью ИИ',
    price: 0,
    margin: 0,
    bonus: 0,
    color: 'orange',
    bgGradient: 'from-orange-400 to-orange-500',
    illustration: '🤖',
    recommended: true,
    status: 'ready',
    details: [
      { title: 'Быстрое составление', description: 'Договоры готовы за минуты' },
      { title: 'Юридическая точность', description: 'Проверка всех условий и рисков' },
    ],
  },
  {
    id: 'sms-signature',
    name: 'SMS-подпись',
    description: 'Электронная подпись через SMS для ускорения сделок',
    price: 0,
    margin: 0,
    bonus: 0,
    color: 'green',
    bgGradient: 'from-green-400 to-emerald-500',
    illustration: '📱',
    recommended: true,
    status: 'ready',
    details: [
      { title: 'Быстрое подписание', description: 'Подпись документов за секунды' },
      { title: 'Снижение рисков', description: 'Юридически значимая подпись' },
    ],
  },
  {
    id: 'deal-support',
    name: 'Сопровождение сделки',
    description: 'Полное сопровождение сделки от начала до конца',
    price: 90000,
    margin: 55000,
    bonus: 4500,
    color: 'pink',
    bgGradient: 'from-pink-400 to-rose-500',
    illustration: '🤝',
    recommended: true,
    status: 'select',
    details: [
      { title: 'Полное сопровождение', description: 'От подготовки документов до регистрации' },
      { title: 'Максимальная маржа', description: 'Самый высокий доход от услуги' },
    ],
  },
];

const colorClasses = {
  blue: 'bg-blue-50 border-blue-200',
  purple: 'bg-purple-50 border-purple-200',
  orange: 'bg-orange-50 border-orange-200',
  green: 'bg-green-50 border-green-200',
  pink: 'bg-pink-50 border-pink-200',
};

const selectedBorderClasses = {
  blue: 'border-blue-500',
  purple: 'border-purple-500',
  orange: 'border-orange-500',
  green: 'border-green-500',
  pink: 'border-pink-500',
};

function Home() {
  const [, navigate] = useLocation();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'invoice' | 'card'>('invoice');
  const [showSidebar, setShowSidebar] = useState(false);
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const { notifications, addNotification, markAsRead } = useNotifications();

  const toggleService = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter(id => id !== serviceId));
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };

  const calculateEarnings = () => {
    let totalPrice = 0;
    let totalMargin = 0;
    let totalBonus = 0;

    selectedServices.forEach(id => {
      const service = allServices.find(s => s.id === id);
      if (service) {
        totalPrice += service.price;
        totalMargin += service.margin;
        totalBonus += service.bonus;
      }
    });

    return { totalPrice, totalMargin, totalBonus };
  };

  const { totalPrice, totalMargin, totalBonus } = calculateEarnings();

  const selectedServicesList = allServices.filter(s => selectedServices.includes(s.id));

  // Расчёт кэшбэка (1.5% от средней цены объекта)
  const avgPropertyPrice = 5800000;
  const cashbackRate = 0.015;
  const cashbackPerDeal = avgPropertyPrice * cashbackRate;
  const totalCashback = cashbackPerDeal * selectedServices.length; // Примерно
  const timeSaved = 16; // Часов экономии

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      {/* Onboarding */}
      <OnboardingWizard />

      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-4xl font-bold text-slate-900">RSpace</h1>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-6 h-6" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </Button>
            </div>
            <nav className="hidden md:flex gap-2">
              <Button
                variant="default"
                className="bg-blue-600 hover:bg-blue-700"
              >
                Создание
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/property')}
              >
                Опубликована
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/portfolio')}
              >
                Портфель
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </Button>
            </nav>
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Earnings Calculator */}
        <EarningsCalculator onStart={() => navigate('/portfolio')} />

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                Доступные сервисы
              </h2>
              <p className="text-sm md:text-base text-slate-600">
                Выберите сервисы для вашего объекта недвижимости
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {allServices.map((service) => {
                const isSelected = selectedServices.includes(service.id);
                const colorClass = colorClasses[service.color as keyof typeof colorClasses];
                const selectedBorder = selectedBorderClasses[service.color as keyof typeof selectedBorderClasses];

                return (
                  <div key={service.id}>
                    <Card
                      className={`p-4 md:p-6 border-2 transition-all cursor-pointer ${
                        isSelected
                          ? `${colorClass} ${selectedBorder}`
                          : 'border-slate-200 hover:border-slate-300'
                      } ${service.recommended ? 'ring-2 ring-yellow-400' : ''}`}
                      onClick={() => {
                        if (service.status === 'select') {
                          toggleService(service.id);
                        } else if (service.status === 'ready') {
                          setExpandedService(expandedService === service.id ? null : service.id);
                        }
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 md:w-16 md:h-16 rounded-lg bg-gradient-to-br ${service.bgGradient} flex items-center justify-center text-2xl md:text-3xl flex-shrink-0`}
                        >
                          {service.illustration}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="text-base md:text-lg font-semibold text-slate-900">
                              {service.name}
                            </h3>
                            {service.recommended && (
                              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full flex-shrink-0">
                                Рекомендуется
                              </span>
                            )}
                          </div>
                          <p className="text-xs md:text-sm text-slate-600 mb-3">
                            {service.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {service.price > 0 && (
                              <span className="text-sm font-semibold text-slate-900">
                                {service.price.toLocaleString('ru-RU')} ₽
                              </span>
                            )}
                            {service.price === 0 && service.status === 'ready' && (
                              <span className="text-sm font-semibold text-green-600">
                                Готово
                              </span>
                            )}
                            {service.margin > 0 && (
                              <span className="text-xs text-slate-500">
                                Маржа: {service.margin.toLocaleString('ru-RU')} ₽
                              </span>
                            )}
                            {service.bonus > 0 && (
                              <span className="text-xs text-slate-500">
                                Бонус: {service.bonus}
                              </span>
                            )}
                          </div>
                          {service.status === 'select' && (
                            <Button
                              className={`w-full ${
                                isSelected
                                  ? 'bg-slate-600 hover:bg-slate-700'
                                  : 'bg-blue-600 hover:bg-blue-700'
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleService(service.id);
                              }}
                            >
                              {isSelected ? 'Убрать' : 'Выбрать'}
                            </Button>
                          )}
                          {service.status === 'ready' && (
                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedService(expandedService === service.id ? null : service.id);
                              }}
                            >
                              Подробнее
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>

                    {/* Expanded Details */}
                    {expandedService === service.id && service.status === 'ready' && (
                      <Card className="mt-2 p-4 border-2 border-slate-200">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-semibold text-slate-900">Преимущества:</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setExpandedService(null)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {service.details.map((detail, idx) => (
                            <div key={idx}>
                              <p className="text-sm font-medium text-slate-900">
                                {detail.title}
                              </p>
                              <p className="text-xs text-slate-600">{detail.description}</p>
                            </div>
                          ))}
                        </div>
                      </Card>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 text-center">
              <a
                href="https://rspacelegal-jgdjfkbw.manus.space/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-700 underline"
              >
                Узнать как это работает
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80">
            <Card className="p-4 md:p-6 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 sticky top-20">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-slate-900">Ваша выгода от сделки</h3>
              </div>

              {selectedServices.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-slate-600 mb-2">
                    Выберите сервисы для расчёта
                  </p>
                  <p className="text-xs text-slate-500">
                    Увидите вашу маржу, кэшбэк и экономию времени
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-2 mb-4">
                    <p className="text-xs font-medium text-slate-700 mb-2">Выбранные сервисы:</p>
                    {selectedServicesList.map((service) => (
                      <div
                        key={service.id}
                        className="flex items-center justify-between text-sm bg-white p-2 rounded border border-slate-200"
                      >
                        <span className="text-slate-700 truncate">{service.name}</span>
                        <span className="font-semibold text-slate-900 ml-2">
                          {service.price.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-blue-200 pt-4 space-y-3 mb-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-slate-600">Стоимость для клиента:</span>
                        <span className="text-base font-bold text-slate-900">
                          {totalPrice.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-slate-600 h-2 rounded-full transition-all"
                          style={{ width: '100%' }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-slate-600 flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          Ваша маржа:
                        </span>
                        <span className="text-lg font-bold text-green-600">
                          {totalMargin.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                      <div className="w-full bg-green-100 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all"
                          style={{ width: `${Math.min((totalMargin / totalPrice) * 100, 100)}%` }}
                        />
                      </div>
                    </div>

                    {totalCashback > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-slate-600 flex items-center gap-1">
                            <Gift className="w-4 h-4" />
                            Кэшбэк от партнёров:
                          </span>
                          <span className="text-base font-bold text-green-600">
                            +{totalCashback.toLocaleString('ru-RU')} ₽
                          </span>
                        </div>
                        <div className="w-full bg-green-100 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all"
                            style={{ width: `${Math.min((totalCashback / totalPrice) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-slate-600 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Экономия времени:
                        </span>
                        <span className="text-base font-bold text-blue-600">
                          {timeSaved} часов
                        </span>
                      </div>
                      <div className="w-full bg-blue-100 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-400 to-indigo-500 h-2 rounded-full transition-all"
                          style={{ width: '80%' }}
                        />
                      </div>
                    </div>

                    {totalBonus > 0 && (
                      <div className="flex items-center justify-between pt-2 border-t border-blue-200">
                        <span className="text-sm text-slate-600">Бонусы:</span>
                        <span className="text-sm font-semibold text-slate-900">
                          {totalBonus.toLocaleString('ru-RU')}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-lg text-white mb-4">
                    <p className="text-xs opacity-90 mb-1">ИТОГО ВЫГОДА:</p>
                    <p className="text-2xl font-bold">
                      {(totalMargin + totalCashback).toLocaleString('ru-RU')} ₽
                    </p>
                    <p className="text-xs opacity-90 mt-1">
                      + {timeSaved} часов времени
                    </p>
                  </div>

                  <div className="space-y-3 mb-4">
                    <label className="text-sm font-medium text-slate-900 block">
                      Способ оплаты:
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          value="invoice"
                          checked={paymentMethod === 'invoice'}
                          onChange={() => setPaymentMethod('invoice')}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm text-slate-700">Выставить счёт</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm text-slate-700">Оплатить картой</span>
                      </label>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      if (paymentMethod === 'invoice') {
                        alert('Счёт будет отправлен на email');
                      } else {
                        alert('Переход к оплате картой');
                      }
                    }}
                  >
                    {paymentMethod === 'invoice' ? 'Выставить счёт' : 'Оплатить картой'}
                  </Button>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {showSidebar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Итого</h3>
              <Button variant="ghost" onClick={() => setShowSidebar(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            {/* Same content as desktop sidebar */}
            {selectedServices.length === 0 ? (
              <p className="text-sm text-slate-600 mb-4">Выберите сервисы для расчёта</p>
            ) : (
              <>
                <div className="space-y-2 mb-4">
                  {selectedServicesList.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-slate-600">{service.name}</span>
                      <span className="font-semibold text-slate-900">
                        {service.price.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-200 pt-4 space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Сумма:</span>
                    <span className="text-lg font-bold text-slate-900">
                      {totalPrice.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Ваша маржа:</span>
                    <span className="text-lg font-bold text-green-600">
                      {totalMargin.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                </div>
                <div className="space-y-3 mb-4">
                  <label className="text-sm font-medium text-slate-900 block">
                    Способ оплаты:
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="payment-mobile"
                        value="invoice"
                        checked={paymentMethod === 'invoice'}
                        onChange={() => setPaymentMethod('invoice')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-slate-700">Выставить счёт</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="payment-mobile"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-slate-700">Оплатить картой</span>
                    </label>
                  </div>
                </div>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    setShowSidebar(false);
                    if (paymentMethod === 'invoice') {
                      alert('Счёт будет отправлен на email');
                    } else {
                      alert('Переход к оплате картой');
                    }
                  }}
                >
                  {paymentMethod === 'invoice' ? 'Выставить счёт' : 'Оплатить картой'}
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Notifications Modal */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="w-full sm:max-w-md">
            <Notifications
              notifications={notifications}
              onClose={() => setShowNotifications(false)}
              onMarkAsRead={markAsRead}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

