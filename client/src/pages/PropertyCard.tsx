import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Phone,
  Shield,
  TrendingUp,
  FileText,
  MessageSquare,
  CheckCircle,
  Zap,
  ChevronDown,
  ArrowLeft,
  Share2,
  Save,
  Mail,
} from 'lucide-react';

interface Service {
  id: string;
  name: string;
  price: number;
  margin: number;
  bonus: number;
  icon: typeof Shield;
  color: string;
  description: string;
  shortUtp: string;
  fullUtp: Array<{ title: string; description: string }>;
}

const services: Service[] = [
  {
    id: 'owner-check',
    name: 'Проверка собственника',
    price: 5000,
    margin: 0,
    bonus: 250,
    icon: Shield,
    color: 'blue',
    description: 'Проверка юридической чистоты объекта',
    shortUtp: 'Полная проверка документов и истории объекта',
    fullUtp: [
      { title: 'Полная проверка', description: 'Проверка всех документов и истории объекта' },
      { title: 'Юридическая экспертиза', description: 'Анализ рисков и правовых аспектов' },
    ],
  },
  {
    id: 'mortgage-pro',
    name: 'Ипотека PRO',
    price: 50000,
    margin: 25000,
    bonus: 2500,
    icon: TrendingUp,
    color: 'purple',
    description: 'Профессиональное сопровождение ипотечной сделки',
    shortUtp: 'Подбор банка и помощь в оформлении документов',
    fullUtp: [
      { title: 'Подбор банка', description: 'Выбор оптимального банка и условий' },
      { title: 'Сбор документов', description: 'Помощь в подготовке всех необходимых документов' },
    ],
  },
  {
    id: 'ai-lawyer',
    name: 'AI-юрист',
    price: 0,
    margin: 0,
    bonus: 0,
    icon: FileText,
    color: 'orange',
    description: 'Автоматическое составление договоров',
    shortUtp: 'Договоры готовы за минуты с помощью ИИ',
    fullUtp: [
      { title: 'Быстрое составление', description: 'Договоры готовы за минуты' },
      { title: 'Юридическая точность', description: 'Проверка всех условий и рисков' },
    ],
  },
  {
    id: 'sms-signature',
    name: 'SMS-подпись',
    price: 0,
    margin: 0,
    bonus: 0,
    icon: MessageSquare,
    color: 'green',
    description: 'Электронная подпись через SMS',
    shortUtp: 'Подпись документов за секунды',
    fullUtp: [
      { title: 'Быстрое подписание', description: 'Подпись документов за секунды' },
      { title: 'Снижение рисков', description: 'Юридически значимая подпись' },
    ],
  },
  {
    id: 'deal-support',
    name: 'Сопровождение сделки',
    price: 90000,
    margin: 55000,
    bonus: 4500,
    icon: CheckCircle,
    color: 'pink',
    description: 'Полное сопровождение сделки',
    shortUtp: 'От подготовки документов до регистрации',
    fullUtp: [
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

const iconColorClasses = {
  blue: 'text-blue-600',
  purple: 'text-purple-600',
  orange: 'text-orange-600',
  green: 'text-green-600',
  pink: 'text-pink-600',
};

const property = {
  address: 'Тюмень, ул. Алматинская, д. 12',
  rooms: 1,
  area: 41,
  floor: '8/16',
  price: 5800000,
  pricePerM2: 141463,
  monthlyPayment: 48074,
  images: 16,
  views: 234,
  calls: 12,
};

function PropertyCard() {
  const [, navigate] = useLocation();
  const [mortgageRate, setMortgageRate] = useState(13.99);
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [dealStage, setDealStage] = useState<'placement' | 'leads' | 'deal'>('leads');

  const insurancePerYear = Math.round(property.price * 0.01);
  const insurancePerMonth = Math.round(insurancePerYear / 12);
  const incomePerYear = Math.round(insurancePerYear * 0.3);
  const incomePerClient10 = incomePerYear * 10;
  const incomePerClient50 = incomePerYear * 50;
  const incomePerClient100 = incomePerYear * 100;
  const potential12Years10 = incomePerClient10 * 12;
  const potential12Years50 = incomePerClient50 * 12;
  const potential12Years100 = incomePerClient100 * 12;

  const calculateMortgage = (price: number, rate: number, years: number = 30) => {
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    const monthlyPayment =
      (price * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(monthlyPayment);
  };

  const monthlyMortgagePayment = calculateMortgage(property.price, mortgageRate);

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl md:text-4xl font-bold text-slate-900">RSpace</h1>
            </div>
            <nav className="hidden md:flex gap-2">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
              >
                Создание
              </Button>
              <Button
                variant="default"
                className="bg-blue-600 hover:bg-blue-700"
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
          </div>
        </div>
      </header>

      {/* Sticky Action Bar */}
      <div className="sticky top-16 z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium text-slate-700 truncate max-w-[200px]">
                {property.address}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Save className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Mail className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Phone className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Timeline */}
        <Card className="p-4 mb-6 border-2 border-slate-200">
          <div className="flex items-center justify-between">
            <div
              className={`flex-1 flex items-center gap-2 cursor-pointer ${
                dealStage === 'placement' ? 'text-blue-600' : 'text-slate-400'
              }`}
              onClick={() => setDealStage('placement')}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  dealStage === 'placement'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-400'
                }`}
              >
                1
              </div>
              <span className="text-sm font-medium">Размещение</span>
            </div>
            <div className="flex-1 h-0.5 bg-slate-200 mx-2" />
            <div
              className={`flex-1 flex items-center gap-2 cursor-pointer ${
                dealStage === 'leads' ? 'text-blue-600' : 'text-slate-400'
              }`}
              onClick={() => setDealStage('leads')}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  dealStage === 'leads'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-400'
                }`}
              >
                2
              </div>
              <span className="text-sm font-medium">Лиды</span>
            </div>
            <div className="flex-1 h-0.5 bg-slate-200 mx-2" />
            <div
              className={`flex-1 flex items-center gap-2 cursor-pointer ${
                dealStage === 'deal' ? 'text-blue-600' : 'text-slate-400'
              }`}
              onClick={() => setDealStage('deal')}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  dealStage === 'deal'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-400'
                }`}
              >
                3
              </div>
              <span className="text-sm font-medium">Сделка</span>
            </div>
          </div>
        </Card>

        {/* Property Card */}
        <Card className="p-4 md:p-6 mb-6 border-2 border-slate-200">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-64 h-48 md:h-64 bg-slate-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-16 h-16 text-slate-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                    {property.address}
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge className="bg-slate-100 text-slate-700">
                      {property.rooms} комн.
                    </Badge>
                    <Badge className="bg-slate-100 text-slate-700">
                      {property.area} м²
                    </Badge>
                    <Badge className="bg-slate-100 text-slate-700">
                      {property.floor} этаж
                    </Badge>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Опубликована</Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-600 mb-1">Цена</p>
                  <p className="text-lg font-bold text-slate-900">
                    {(property.price / 1000000).toFixed(1)}M ₽
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 mb-1">Платеж</p>
                  <p className="text-lg font-bold text-slate-900">
                    {property.monthlyPayment.toLocaleString('ru-RU')} ₽/мес
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 mb-1">Просмотры</p>
                  <p className="text-lg font-bold text-slate-900">{property.views}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 mb-1">Звонки</p>
                  <p className="text-lg font-bold text-slate-900">{property.calls}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Phone className="w-4 h-4" />
                <span>Интерес: {Math.round((property.calls / property.views) * 100)}%</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Available Services */}
        <div className="mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
            Доступные сервисы
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => {
              const Icon = service.icon;
              const colorClass = colorClasses[service.color as keyof typeof colorClasses];
              const selectedBorder = selectedBorderClasses[service.color as keyof typeof selectedBorderClasses];
              const iconColor = iconColorClasses[service.color as keyof typeof iconColorClasses];
              const isExpanded = expandedService === service.id;

              return (
                <div key={service.id}>
                  <Card
                    className={`p-4 border-2 transition-all ${
                      isExpanded ? `${colorClass} ${selectedBorder}` : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className={`w-10 h-10 rounded-lg ${colorClass} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className={`w-5 h-5 ${iconColorClasses[service.color as keyof typeof iconColorClasses]}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-slate-900 mb-1">
                          {service.name}
                        </h4>
                        <p className="text-xs text-slate-600 mb-2">{service.shortUtp}</p>
                        <div className="flex flex-wrap gap-2 text-xs">
                          {service.price > 0 && (
                            <span className="font-semibold text-slate-900">
                              {service.price.toLocaleString('ru-RU')} ₽
                            </span>
                          )}
                          {service.margin > 0 && (
                            <span className="text-slate-500">
                              Маржа: {service.margin.toLocaleString('ru-RU')} ₽
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() =>
                        setExpandedService(isExpanded ? null : service.id)
                      }
                    >
                      {isExpanded ? 'Свернуть' : 'Подробнее'}
                      <ChevronDown
                        className={`w-4 h-4 ml-2 transition-transform ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </Button>
                  </Card>

                  {isExpanded && (
                    <Card className="mt-2 p-4 border-2 border-slate-200">
                      <div className="space-y-3">
                        {service.fullUtp.map((utp, idx) => (
                          <div key={idx}>
                            <p className="text-sm font-medium text-slate-900 mb-1">
                              {utp.title}
                            </p>
                            <p className="text-xs text-slate-600">{utp.description}</p>
                          </div>
                        ))}
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          Выбрать
                        </Button>
                      </div>
                    </Card>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Insurance Section */}
        <Card className="p-4 md:p-6 mb-6 border-2 border-indigo-200 bg-indigo-50">
          <div className="flex items-start gap-3 mb-4">
            <Zap className="w-6 h-6 text-indigo-600 flex-shrink-0" />
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                Пассивный доход от страховки ипотеки
              </h3>
              <p className="text-sm text-slate-600">
                Получайте доход каждый год от каждого клиента, который оформил страховку
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-xs text-slate-600 mb-1">Стоимость страховки</p>
              <p className="text-lg font-bold text-slate-900">
                {insurancePerMonth.toLocaleString('ru-RU')} ₽/мес
              </p>
              <p className="text-sm text-slate-600">
                {insurancePerYear.toLocaleString('ru-RU')} ₽/год
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-600 mb-1">Ваш доход в год (30% маржа)</p>
              <p className="text-lg font-bold text-green-600">
                {incomePerYear.toLocaleString('ru-RU')} ₽
              </p>
              <p className="text-sm text-slate-600">от одного клиента</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Доход в первый год:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <p className="text-xs text-slate-600 mb-1">10 клиентов</p>
                  <p className="text-lg font-bold text-slate-900">
                    {incomePerClient10.toLocaleString('ru-RU')} ₽
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <p className="text-xs text-slate-600 mb-1">50 клиентов</p>
                  <p className="text-lg font-bold text-slate-900">
                    {incomePerClient50.toLocaleString('ru-RU')} ₽
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <p className="text-xs text-slate-600 mb-1">100 клиентов</p>
                  <p className="text-lg font-bold text-slate-900">
                    {incomePerClient100.toLocaleString('ru-RU')} ₽
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 mb-2">
                Потенциал за 12 лет (срок ипотеки):
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <p className="text-xs text-slate-600 mb-1">10 клиентов</p>
                  <p className="text-lg font-bold text-green-600">
                    {potential12Years10.toLocaleString('ru-RU')} ₽
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <p className="text-xs text-slate-600 mb-1">50 клиентов</p>
                  <p className="text-lg font-bold text-green-600">
                    {potential12Years50.toLocaleString('ru-RU')} ₽
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <p className="text-xs text-slate-600 mb-1">100 клиентов</p>
                  <p className="text-lg font-bold text-green-600">
                    {potential12Years100.toLocaleString('ru-RU')} ₽
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-600 mt-4">
            * Расчёт основан на стандартном сроке ипотеки 12 лет и марже 30% от стоимости страховки
          </p>
        </Card>

        {/* Mortgage Calculator */}
        <Card className="p-4 md:p-6 mb-6 border-2 border-slate-200">
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
            Ипотечный калькулятор
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-900">
                  Ставка по ипотеке
                </label>
                <span className="text-lg font-bold text-slate-900">{mortgageRate}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="20"
                step="0.1"
                value={mortgageRate}
                onChange={(e) => setMortgageRate(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-slate-600 mb-1">Ежемесячный платёж</p>
              <p className="text-2xl font-bold text-slate-900">
                {monthlyMortgagePayment.toLocaleString('ru-RU')} ₽
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Рекомендуемые банки:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {['Сбербанк', 'ВТБ', 'Альфа-Банк', 'Райффайзен'].map((bank) => (
                  <Badge key={bank} className="bg-slate-100 text-slate-700 justify-center py-2">
                    {bank}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
              <p className="text-sm text-slate-700">
                💡 <strong>Совет:</strong> Используйте услугу "Ипотека PRO" для получения лучших
                условий и увеличения маржи
              </p>
            </div>
          </div>
        </Card>

        {/* Certificate Section */}
        <Card className="p-4 md:p-6 border-2 border-slate-200">
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
            Сертификат страховки
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Страховка в год:</span>
              <span className="font-semibold text-slate-900">
                {insurancePerYear.toLocaleString('ru-RU')} ₽
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Сумма возврата:</span>
              <span className="font-semibold text-slate-900">
                {Math.round(insurancePerYear * 0.3).toLocaleString('ru-RU')} ₽
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Срок действия:</span>
              <span className="font-semibold text-slate-900">12 месяцев</span>
            </div>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
              Посмотреть сертификат
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default PropertyCard;

