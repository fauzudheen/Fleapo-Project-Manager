import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ColorVariant = 'blue' | 'green' | 'yellow' | 'red';

interface TaskAnalyticsCardProps {
  title: string;
  value?: number;
  colorVariant: ColorVariant;
}

const TaskAnalyticsCard = ({
  title,
  value = 0,
  colorVariant,
}: TaskAnalyticsCardProps) => {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      value: 'text-blue-900'
    },
    green: {
      bg: 'bg-green-50',
      text: 'text-green-700',
      value: 'text-green-900'
    },
    yellow: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-700',
      value: 'text-yellow-900'
    },
    red: {
      bg: 'bg-red-50',
      text: 'text-red-700',
      value: 'text-red-900'
    }
  };

  const colors = colorClasses[colorVariant];

  return (
    <Card className={colors.bg}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={`text-sm font-medium ${colors.text}`}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${colors.value}`}>
          {value}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskAnalyticsCard;