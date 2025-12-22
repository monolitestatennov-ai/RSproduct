import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Clock, DollarSign } from 'lucide-react';

interface EarningsCalculatorProps {
  onStart?: () => void;
}

function EarningsCalculator({ onStart }: EarningsCalculatorProps) {
  const [dealsPerMonth, setDealsPerMonth] = useState(3);
  const [avgPrice, setAvgPrice] = useState(5800000);

  // Расчёты
  const subscriptionCost = 3000;
  const avgCommissionRate = 0.025; // 2.5% средняя комиссия
  const avgCommission = avgPrice * avgCommissionRate;
  
  // Без RSpace
  const classifiedCost = 15000; // Стоимость размещения на классифайдах
  const mortgageBrokerCost = 25000; // Ипотечный брокер
  const lawyerCost = 10000; // Юрист
  const timeSpent = 24; // Часов на сделку
  
  const totalCostWithoutRSpace = (classifiedCost + mortgageBrokerCost + lawyerCost) * dealsPerMonth;
  const totalTimeWithoutRSpace = timeSpent * dealsPerMonth;
  
  // С RSpace
  const cashbackRate = 0.015; // 1.5% кэшбэк от банков
  const cashbackPerDeal = avgPrice * cashbackRate;
  const timeSaved = 16; // Часов экономии на сделку
  
  const totalCostWithRSpace = subscriptionCost;
  const totalCashback = cashbackPerDeal * dealsPerMonth;
  const totalTimeSaved = timeSaved * dealsPerMonth;
  
  const totalSavings = totalCostWithoutRSpace - totalCostWithRSpace + totalCashback;
  const netBenefit = totalSavings;

  return (
    <Card className="p-6 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
          <DollarSign className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900">
            Калькулятор вашей выгоды
          </h3>
          <p className="text-sm text-slate-600">
            Узнайте, сколько вы экономите с RSpace
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Количество сделок в месяц
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="1"
              max="10"
              value={dealsPerMonth}
              onChange={(e) => setDealsPerMonth(Number(e.target.value))}
              className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-lg font-bold text-slate-900 min-w-[3rem] text-center">
              {dealsPerMonth}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Средняя цена объекта
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={avgPrice}
              onChange={(e) => setAvgPrice(Number(e.target.value))}
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
            <span className="text-sm text-slate-600">₽</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Без RSpace */}
        <Card className="p-4 border-2 border-red-200 bg-red-50">
          <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <span className="text-red-600">❌</span> БЕЗ RSpace
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Классифайды:</span>
              <span className="font-semibold text-slate-900">
                {(classifiedCost * dealsPerMonth).toLocaleString('ru-RU')} ₽
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Ипотечный брокер:</span>
              <span className="font-semibold text-slate-900">
                {(mortgageBrokerCost * dealsPerMonth).toLocaleString('ru-RU')} ₽
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Юрист:</span>
              <span className="font-semibold text-slate-900">
                {(lawyerCost * dealsPerMonth).toLocaleString('ru-RU')} ₽
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-red-200">
              <span className="text-slate-600">Время на рутину:</span>
              <span className="font-semibold text-slate-900 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {totalTimeWithoutRSpace} часов
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t-2 border-red-300 mt-2">
              <span className="font-bold text-slate-900">ИТОГО:</span>
              <span className="font-bold text-red-600 text-lg">
                {totalCostWithoutRSpace.toLocaleString('ru-RU')} ₽
              </span>
            </div>
          </div>
        </Card>

        {/* С RSpace */}
        <Card className="p-4 border-2 border-green-200 bg-green-50">
          <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <span className="text-green-600">✅</span> С RSpace
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Подписка:</span>
              <span className="font-semibold text-slate-900">
                {subscriptionCost.toLocaleString('ru-RU')} ₽
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Кэшбэк от банков:</span>
              <span className="font-semibold text-green-600">
                +{totalCashback.toLocaleString('ru-RU')} ₽
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-green-200">
              <span className="text-slate-600">Время на рутину:</span>
              <span className="font-semibold text-slate-900 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {timeSpent - timeSaved} часов
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t-2 border-green-300 mt-2">
              <span className="font-bold text-slate-900">ИТОГО:</span>
              <span className="font-bold text-green-600 text-lg">
                {totalCostWithRSpace.toLocaleString('ru-RU')} ₽
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Итоговая выгода */}
      <Card className="p-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90 mb-1">🎉 ВЫ ЭКОНОМИТЕ:</p>
            <p className="text-3xl md:text-4xl font-bold">
              {netBenefit.toLocaleString('ru-RU')} ₽/мес
            </p>
            <p className="text-sm opacity-90 mt-2 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              + {totalTimeSaved} часов времени
            </p>
          </div>
          <TrendingUp className="w-16 h-16 opacity-20" />
        </div>
      </Card>

      {onStart && (
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg py-6"
          onClick={onStart}
        >
          Начать экономить прямо сейчас
        </Button>
      )}
    </Card>
  );
}

export default EarningsCalculator;

