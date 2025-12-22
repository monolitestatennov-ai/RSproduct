import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  TrendingUp,
  DollarSign,
  Clock,
  Target,
  Award,
  CheckCircle,
  Phone,
  Eye,
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  icon: typeof CheckCircle;
}

const achievements: Achievement[] = [
  {
    id: 'first-deal',
    title: 'Первая сделка',
    description: 'Завершите первую сделку через RSpace',
    unlocked: true,
    icon: CheckCircle,
  },
  {
    id: 'three-deals',
    title: '3 сделки за месяц',
    description: 'Завершите 3 сделки в течение месяца',
    unlocked: true,
    icon: CheckCircle,
  },
  {
    id: 'five-deals',
    title: '5 сделок за месяц',
    description: 'Завершите 5 сделок в течение месяца',
    unlocked: false,
    icon: Target,
  },
  {
    id: 'ten-deals',
    title: '10 сделок за месяц',
    description: 'Завершите 10 сделок в течение месяца',
    unlocked: false,
    icon: Award,
  },
];

function Dashboard() {
  const [, navigate] = useLocation();
  const [userLevel, setUserLevel] = useState<'bronze' | 'silver' | 'gold'>('bronze');
  const [dealsThisMonth, setDealsThisMonth] = useState(3);
  const [dealsGoal, setDealsGoal] = useState(5);
  const [earningsThisMonth, setEarningsThisMonth] = useState(240000);
  const [savingsThisMonth, setSavingsThisMonth] = useState(55300);
  const [timeSaved, setTimeSaved] = useState(48);
  const [views, setViews] = useState(234);
  const [calls, setCalls] = useState(12);

  const progressPercentage = Math.min((dealsThisMonth / dealsGoal) * 100, 100);
  const dealsToNextLevel = dealsGoal - dealsThisMonth;

  const levelInfo = {
    bronze: { name: 'Бронза', color: 'from-amber-400 to-orange-500', icon: '🥉' },
    silver: { name: 'Серебро', color: 'from-slate-300 to-slate-400', icon: '🥈' },
    gold: { name: 'Золото', color: 'from-yellow-400 to-yellow-600', icon: '🥇' },
  };

  const currentLevel = levelInfo[userLevel];

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
                variant="outline"
                onClick={() => navigate('/portfolio')}
              >
                Портфель
              </Button>
              <Button
                variant="default"
                className="bg-blue-600 hover:bg-blue-700"
              >
                Dashboard
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Welcome Section */}
        <Card className="p-6 mb-6 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                👋 Добро пожаловать, Иван!
              </h2>
              <div className="flex items-center gap-3">
                <Badge className={`bg-gradient-to-r ${currentLevel.color} text-white px-4 py-1 text-base`}>
                  {currentLevel.icon} {currentLevel.name}
                </Badge>
                <span className="text-sm text-slate-600">
                  До следующего уровня: {dealsToNextLevel} {dealsToNextLevel === 1 ? 'сделка' : 'сделки'}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 border-2 border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Сделок в этом месяце</span>
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{dealsThisMonth}</p>
            <p className="text-xs text-slate-500 mt-1">Цель: {dealsGoal} сделок</p>
          </Card>

          <Card className="p-4 border-2 border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Доход в этом месяце</span>
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">
              {earningsThisMonth.toLocaleString('ru-RU')} ₽
            </p>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12% к прошлому месяцу
            </p>
          </Card>

          <Card className="p-4 border-2 border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Экономия</span>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">
              {savingsThisMonth.toLocaleString('ru-RU')} ₽
            </p>
            <p className="text-xs text-slate-500 mt-1">Благодаря RSpace</p>
          </Card>

          <Card className="p-4 border-2 border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Время сэкономлено</span>
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{timeSaved} часов</p>
            <p className="text-xs text-slate-500 mt-1">В этом месяце</p>
          </Card>
        </div>

        {/* Progress Card */}
        <Card className="p-6 mb-6 border-2 border-yellow-200 bg-yellow-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">🎯 Цель месяца</h3>
            <span className="text-sm font-semibold text-slate-700">
              {dealsThisMonth} / {dealsGoal} сделок
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-4 mb-2">
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-sm text-slate-600">
            Осталось {dealsToNextLevel} {dealsToNextLevel === 1 ? 'сделка' : 'сделки'} до достижения цели
          </p>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Achievements */}
          <Card className="p-6 border-2 border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-600" />
              Достижения
            </h3>
            <div className="space-y-3">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={achievement.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border-2 ${
                      achievement.unlocked
                        ? 'bg-green-50 border-green-200'
                        : 'bg-slate-50 border-slate-200 opacity-60'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        achievement.unlocked
                          ? 'bg-green-100 text-green-600'
                          : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 mb-1">
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-slate-600">{achievement.description}</p>
                    </div>
                    {achievement.unlocked && (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Activity Stats */}
          <Card className="p-6 border-2 border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Активность
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-slate-900">Просмотры объектов</p>
                    <p className="text-xs text-slate-600">За этот месяц</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-blue-600">{views}</p>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-semibold text-slate-900">Звонки от клиентов</p>
                    <p className="text-xs text-slate-600">За этот месяц</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-green-600">{calls}</p>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-semibold text-slate-900">Конверсия</p>
                    <p className="text-xs text-slate-600">Звонки / Просмотры</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round((calls / views) * 100)}%
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6 border-2 border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Быстрые действия</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => navigate('/')}
            >
              Добавить сервисы
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate('/portfolio')}
            >
              Посмотреть портфель
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate('/property')}
            >
              Управление объектами
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;

