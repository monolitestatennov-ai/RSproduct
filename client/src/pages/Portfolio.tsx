import { useState, useMemo } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Heart,
  MapPin,
  Phone,
  Share2,
  X,
  Copy,
  Check,
  Mail,
  MessageCircle,
  ArrowLeft,
} from 'lucide-react';

interface Property {
  id: string;
  address: string;
  price: number;
  area: number;
  rooms: number;
  floor: string;
  totalFloors: number;
  type: 'apartment' | 'house' | 'studio';
  image: string;
  status: 'active' | 'in-progress' | 'sold' | 'archived';
}

const allProperties: Property[] = [
  {
    id: 'prop-1',
    address: 'Тюмень, ул. Воронинская, д. 47',
    price: 12500000,
    area: 64.7,
    rooms: 2,
    floor: '7/9',
    totalFloors: 9,
    type: 'apartment',
    image: '',
    status: 'active',
  },
  {
    id: 'prop-2',
    address: 'Тюмень, пр. Мира, д. 5',
    price: 12500000,
    area: 64.8,
    rooms: 2,
    floor: '6/9',
    totalFloors: 9,
    type: 'apartment',
    image: '',
    status: 'active',
  },
  {
    id: 'prop-3',
    address: 'Тюмень, ул. Кунцевская, д. 13',
    price: 11200000,
    area: 58.4,
    rooms: 1,
    floor: '4/12',
    totalFloors: 12,
    type: 'apartment',
    image: '',
    status: 'in-progress',
  },
  {
    id: 'prop-4',
    address: 'Тюмень, ул. Василия Поширбикина, д. 13',
    price: 11200000,
    area: 58.4,
    rooms: 1,
    floor: '4/12',
    totalFloors: 12,
    type: 'apartment',
    image: '',
    status: 'active',
  },
  {
    id: 'prop-5',
    address: 'Тюмень, ул. Василия Поширбикина, д. 21',
    price: 5900000,
    area: 42.1,
    rooms: 1,
    floor: '16/16',
    totalFloors: 16,
    type: 'apartment',
    image: '',
    status: 'sold',
  },
  {
    id: 'prop-6',
    address: 'Тюмень, ул. Воронинская, д. 47',
    price: 12500000,
    area: 64.7,
    rooms: 2,
    floor: '9/9',
    totalFloors: 9,
    type: 'apartment',
    image: '',
    status: 'active',
  },
  {
    id: 'prop-7',
    address: 'Тюмень, ул. Фармана Салманова, д. 26',
    price: 12500000,
    area: 64.8,
    rooms: 2,
    floor: '6/9',
    totalFloors: 9,
    type: 'apartment',
    image: '',
    status: 'in-progress',
  },
  {
    id: 'prop-8',
    address: 'Тюмень, ул. Кунцевская, д. 13',
    price: 11200000,
    area: 58.4,
    rooms: 1,
    floor: '4/12',
    totalFloors: 12,
    type: 'apartment',
    image: '',
    status: 'sold',
  },
  {
    id: 'prop-9',
    address: 'Тюмень, ул. Воронинская, д. 47',
    price: 12500000,
    area: 64.7,
    rooms: 2,
    floor: '7/9',
    totalFloors: 9,
    type: 'apartment',
    image: '',
    status: 'active',
  },
  {
    id: 'prop-10',
    address: 'Тюмень, пр. Мира, д. 5',
    price: 12500000,
    area: 64.8,
    rooms: 2,
    floor: '6/9',
    totalFloors: 9,
    type: 'apartment',
    image: '',
    status: 'archived',
  },
  {
    id: 'prop-11',
    address: 'Тюмень, ул. Кунцевская, д. 13',
    price: 11200000,
    area: 58.4,
    rooms: 1,
    floor: '4/12',
    totalFloors: 12,
    type: 'apartment',
    image: '',
    status: 'active',
  },
  {
    id: 'prop-12',
    address: 'Тюмень, ул. Фармана Салманова, д. 26',
    price: 12500000,
    area: 64.8,
    rooms: 2,
    floor: '6/9',
    totalFloors: 9,
    type: 'apartment',
    image: '',
    status: 'sold',
  },
];

const allServices = [
  {
    id: 'owner-check',
    name: 'Проверка собственника',
    price: 5000,
    margin: 0,
    bonus: 250,
    illustration: '🛡️',
    bgGradient: 'from-cyan-400 to-blue-500',
  },
  {
    id: 'mortgage-pro',
    name: 'Ипотека PRO',
    price: 50000,
    margin: 25000,
    bonus: 2500,
    illustration: '🏦',
    bgGradient: 'from-purple-400 to-purple-500',
  },
  {
    id: 'ai-lawyer',
    name: 'AI-юрист',
    price: 0,
    margin: 0,
    bonus: 0,
    illustration: '🤖',
    bgGradient: 'from-orange-400 to-orange-500',
  },
  {
    id: 'sms-signature',
    name: 'SMS-подпись',
    price: 0,
    margin: 0,
    bonus: 0,
    illustration: '📱',
    bgGradient: 'from-green-400 to-emerald-500',
  },
  {
    id: 'deal-support',
    name: 'Сопровождение сделки',
    price: 90000,
    margin: 55000,
    bonus: 4500,
    illustration: '🤝',
    bgGradient: 'from-pink-400 to-rose-500',
  },
  {
    id: 'insurance',
    name: 'Страховка ипотеки',
    price: 0,
    margin: 0,
    bonus: 0,
    illustration: '💼',
    bgGradient: 'from-indigo-600 to-purple-600',
  },
];

const typeLabels = {
  all: 'Все объекты',
  apartment: 'Квартиры',
  house: 'Дома',
  studio: 'Студии',
};

function Portfolio() {
  const [, navigate] = useLocation();
  const [selectedStatus, setSelectedStatus] = useState<'active' | 'in-progress' | 'sold' | 'archived' | 'all'>('active');
  const [selectedType, setSelectedType] = useState<'all' | 'apartment' | 'house' | 'studio'>('all');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'area-asc' | 'area-desc'>('price-desc');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [propertyServices, setPropertyServices] = useState<string[]>([]);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareProperty, setShareProperty] = useState<Property | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const filteredProperties = useMemo(() => {
    let filtered = allProperties;

    // Фильтр по статусу
    if (selectedStatus !== 'all') {
      filtered = filtered.filter((p) => p.status === selectedStatus);
    }

    // Фильтр по типу
    if (selectedType !== 'all') {
      filtered = filtered.filter((p) => p.type === selectedType);
    }

    // Сортировка
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'area-asc':
          return a.area - b.area;
        case 'area-desc':
          return b.area - a.area;
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedStatus, selectedType, sortBy]);

  const statusCounts = useMemo(() => {
    return {
      active: allProperties.filter(p => p.status === 'active').length,
      'in-progress': allProperties.filter(p => p.status === 'in-progress').length,
      sold: allProperties.filter(p => p.status === 'sold').length,
      archived: allProperties.filter(p => p.status === 'archived').length,
    };
  }, []);

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((f) => f !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const toggleService = (serviceId: string) => {
    if (propertyServices.includes(serviceId)) {
      setPropertyServices(propertyServices.filter((id) => id !== serviceId));
    } else {
      setPropertyServices([...propertyServices, serviceId]);
    }
  };

  const calculateEarnings = () => {
    let totalMargin = 0;
    let totalBonus = 0;

    propertyServices.forEach((id) => {
      const service = allServices.find((s) => s.id === id);
      if (service) {
        totalMargin += service.margin;
        totalBonus += service.bonus;
      }
    });

    return { totalMargin, totalBonus };
  };

  const { totalMargin, totalBonus } = calculateEarnings();

  const totalPortfolioEarnings = useMemo(() => {
    const avgMargin = 80000;
    return avgMargin * allProperties.length;
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const shareUrl = shareProperty
    ? `${window.location.origin}/property?id=${shareProperty.id}`
    : '';

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
                variant="outline"
                onClick={() => navigate('/property')}
              >
                Опубликована
              </Button>
              <Button
                variant="default"
                className="bg-blue-600 hover:bg-blue-700"
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

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Earnings Banner */}
        <Card className="p-4 md:p-6 mb-6 border-2 border-yellow-200 bg-yellow-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Ваш потенциальный заработок</p>
              <p className="text-2xl md:text-3xl font-bold text-slate-900">
                {totalPortfolioEarnings.toLocaleString('ru-RU')} ₽
              </p>
              <p className="text-xs text-slate-600 mt-1">
                При условии продажи всех объектов с использованием всех сервисов
              </p>
            </div>
          </div>
        </Card>

        {/* Status Tabs */}
        <div className="flex flex-wrap gap-2 mb-4 border-b border-slate-200 pb-4">
          <Button
            variant={selectedStatus === 'active' ? 'default' : 'outline'}
            onClick={() => setSelectedStatus('active')}
            className={selectedStatus === 'active' ? 'bg-blue-600 hover:bg-blue-700' : ''}
          >
            Активные ({statusCounts.active})
          </Button>
          <Button
            variant={selectedStatus === 'in-progress' ? 'default' : 'outline'}
            onClick={() => setSelectedStatus('in-progress')}
            className={selectedStatus === 'in-progress' ? 'bg-orange-600 hover:bg-orange-700' : ''}
          >
            В работе ({statusCounts['in-progress']})
          </Button>
          <Button
            variant={selectedStatus === 'sold' ? 'default' : 'outline'}
            onClick={() => setSelectedStatus('sold')}
            className={selectedStatus === 'sold' ? 'bg-green-600 hover:bg-green-700' : ''}
          >
            Проданы ({statusCounts.sold})
          </Button>
          <Button
            variant={selectedStatus === 'archived' ? 'default' : 'outline'}
            onClick={() => setSelectedStatus('archived')}
            className={selectedStatus === 'archived' ? 'bg-slate-600 hover:bg-slate-700' : ''}
          >
            Архив ({statusCounts.archived})
          </Button>
        </div>

        {/* Filters & Sorting */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {(Object.keys(typeLabels) as Array<keyof typeof typeLabels>).map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? 'default' : 'outline'}
                onClick={() => setSelectedType(type)}
                className={selectedType === type ? 'bg-blue-600 hover:bg-blue-700' : ''}
              >
                {typeLabels[type]} ({allProperties.filter(p => type === 'all' || p.type === type).length})
              </Button>
            ))}
          </div>
          <div className="flex-1 md:flex-none">
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as
                    | 'price-asc'
                    | 'price-desc'
                    | 'area-asc'
                    | 'area-desc'
                )
              }
              className="w-full md:w-auto px-4 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="price-desc">Цена: выше</option>
              <option value="price-asc">Цена: ниже</option>
              <option value="area-desc">Площадь: больше</option>
              <option value="area-asc">Площадь: меньше</option>
            </select>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredProperties.map((property) => (
            <Card
              key={property.id}
              className="p-4 border-2 border-slate-200 hover:border-slate-300 transition-all"
            >
              <div className="w-full h-48 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-12 h-12 text-slate-400" />
              </div>
              <div className="mb-3">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-slate-900 line-clamp-2 flex-1">
                    {property.address}
                  </h3>
                  {property.status === 'active' && (
                    <Badge className="bg-green-100 text-green-800 ml-2">Активна</Badge>
                  )}
                  {property.status === 'in-progress' && (
                    <Badge className="bg-orange-100 text-orange-800 ml-2">В работе</Badge>
                  )}
                  {property.status === 'sold' && (
                    <Badge className="bg-blue-100 text-blue-800 ml-2">Продана</Badge>
                  )}
                  {property.status === 'archived' && (
                    <Badge className="bg-slate-100 text-slate-600 ml-2">Архив</Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge className="bg-slate-100 text-slate-700">
                    {property.rooms} комн.
                  </Badge>
                  <Badge className="bg-slate-100 text-slate-700">
                    {property.area} м²
                  </Badge>
                  <Badge className="bg-slate-100 text-slate-700">
                    {property.floor}
                  </Badge>
                </div>
                <p className="text-xl font-bold text-slate-900">
                  {(property.price / 1000000).toFixed(1)}M ₽
                </p>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFavorite(property.id)}
                  className="p-2"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(property.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-slate-400'
                    }`}
                  />
                </Button>
                <Badge className="bg-slate-100 text-slate-700">
                  {property.type === 'apartment' ? 'Квартира' : property.type}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setSelectedProperty(property);
                    setPropertyServices([]);
                  }}
                >
                  Услуги
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShareProperty(property);
                    setShareModalOpen(true);
                  }}
                >
                  <Share2 className="w-4 h-4 mr-1" />
                  Поделиться
                </Button>
                <Button variant="outline" className="p-2">
                  <Phone className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600">Объекты не найдены</p>
          </div>
        )}
      </div>

      {/* Services Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-4">
          <Card className="w-full sm:max-w-2xl rounded-t-2xl sm:rounded-lg max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Услуги для объекта
                  </h3>
                  <p className="text-sm text-slate-600">{selectedProperty.address}</p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedProperty(null)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {allServices.map((service) => {
                  const isSelected = propertyServices.includes(service.id);
                  return (
                    <Card
                      key={service.id}
                      className={`p-4 border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                      onClick={() => toggleService(service.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.bgGradient} flex items-center justify-center text-2xl flex-shrink-0`}
                        >
                          {service.illustration}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-slate-900 mb-1">
                            {service.name}
                          </h4>
                          {service.price > 0 && (
                            <p className="text-sm font-semibold text-slate-900 mb-1">
                              {service.price.toLocaleString('ru-RU')} ₽
                            </p>
                          )}
                          {service.margin > 0 && (
                            <p className="text-xs text-slate-600">
                              Маржа: {service.margin.toLocaleString('ru-RU')} ₽
                            </p>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {propertyServices.length > 0 && (
                <Card className="p-4 mb-4 border-2 border-green-200 bg-green-50">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Ваша маржа:</span>
                      <span className="text-lg font-bold text-green-600">
                        {totalMargin.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                    {totalBonus > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Бонусы:</span>
                        <span className="text-sm font-semibold text-slate-900">
                          {totalBonus.toLocaleString('ru-RU')}
                        </span>
                      </div>
                    )}
                  </div>
                </Card>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedProperty(null)}
                >
                  Отмена
                </Button>
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    alert('Услуги выбраны');
                    setSelectedProperty(null);
                  }}
                >
                  Применить
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Share Modal */}
      {shareModalOpen && shareProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-4">
          <Card className="w-full sm:max-w-md rounded-t-2xl sm:rounded-lg">
            <div className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900">Поделиться</h3>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setShareModalOpen(false);
                    setShareProperty(null);
                  }}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="mb-4">
                <p className="text-sm text-slate-600 mb-2">{shareProperty.address}</p>
                <p className="text-lg font-bold text-slate-900">
                  {(shareProperty.price / 1000000).toFixed(1)}M ₽
                </p>
              </div>

              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => copyToClipboard(shareUrl)}
                >
                  {copySuccess ? (
                    <>
                      <Check className="w-5 h-5 mr-2 text-green-600" />
                      Скопировано!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5 mr-2" />
                      Копировать ссылку
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    window.open(
                      `https://wa.me/?text=${encodeURIComponent(
                        `Посмотрите этот объект: ${shareProperty.address} - ${(shareProperty.price / 1000000).toFixed(1)}M ₽ ${shareUrl}`
                      )}`,
                      '_blank'
                    );
                  }}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    window.open(
                      `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(
                        `Посмотрите этот объект: ${shareProperty.address} - ${(shareProperty.price / 1000000).toFixed(1)}M ₽`
                      )}`,
                      '_blank'
                    );
                  }}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Telegram
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    window.location.href = `mailto:?subject=${encodeURIComponent(
                      `Объект недвижимости: ${shareProperty.address}`
                    )}&body=${encodeURIComponent(
                      `Посмотрите этот объект: ${shareProperty.address} - ${(shareProperty.price / 1000000).toFixed(1)}M ₽\n\n${shareUrl}`
                    )}`;
                  }}
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Email
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Portfolio;

