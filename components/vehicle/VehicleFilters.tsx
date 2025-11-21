// frontend/components/vehicle/VehicleFilters.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FilterX } from 'lucide-react';

interface Filters {
  brand: string;
  minPrice: string;
  maxPrice: string;
  fuelType: string;
  transmission: string;
  year: string;
}

interface VehicleFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export default function VehicleFilters({ filters, onChange }: VehicleFiltersProps) {
  const [localFilters, setLocalFilters] = useState<Filters>(filters);

  // Popular car brands in the Philippines
  const brands = [
    'Toyota', 'Honda', 'Mitsubishi', 'Nissan', 'Mazda', 
    'Suzuki', 'Ford', 'Hyundai', 'Kia', 'Chevrolet',
    'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Subaru'
  ];

  // Fuel types
  const fuelTypes = ['Gasoline', 'Diesel', 'Hybrid', 'Electric'];

  // Transmission types
  const transmissionTypes = ['Automatic', 'Manual', 'CVT'];

  // Generate year options (current year to 20 years back)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - i);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value === 'all' ? '' : value
    }));
  };

  const applyFilters = () => {
    onChange(localFilters);
  };

  const clearFilters = () => {
    const emptyFilters: Filters = {
      brand: '',
      minPrice: '',
      maxPrice: '',
      fuelType: '',
      transmission: '',
      year: '',
    };
    setLocalFilters(emptyFilters);
    onChange(emptyFilters);
  };

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Filters</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-8 px-2"
          >
            <FilterX className="w-4 h-4 mr-1" />
            Clear
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Brand Filter */}
        <div className="space-y-2">
          <Label htmlFor="brand">Brand</Label>
          <Select
            value={localFilters.brand || 'all'}
            onValueChange={(value) => handleFilterChange('brand', value)}
          >
            <SelectTrigger id="brand">
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <Label>Price Range</Label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Input
                type="number"
                placeholder="Min"
                value={localFilters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                min="0"
              />
            </div>
            <div>
              <Input
                type="number"
                placeholder="Max"
                value={localFilters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Fuel Type Filter */}
        <div className="space-y-2">
          <Label htmlFor="fuelType">Fuel Type</Label>
          <Select
            value={localFilters.fuelType || 'all'}
            onValueChange={(value) => handleFilterChange('fuelType', value)}
          >
            <SelectTrigger id="fuelType">
              <SelectValue placeholder="Select fuel type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {fuelTypes.map((type) => (
                <SelectItem key={type} value={type.toLowerCase()}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Transmission Filter */}
        <div className="space-y-2">
          <Label htmlFor="transmission">Transmission</Label>
          <Select
            value={localFilters.transmission || 'all'}
            onValueChange={(value) => handleFilterChange('transmission', value)}
          >
            <SelectTrigger id="transmission">
              <SelectValue placeholder="Select transmission" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {transmissionTypes.map((type) => (
                <SelectItem key={type} value={type.toLowerCase()}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Year Filter */}
        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Select
            value={localFilters.year || 'all'}
            onValueChange={(value) => handleFilterChange('year', value)}
          >
            <SelectTrigger id="year">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Apply Button */}
        <Button 
          onClick={applyFilters} 
          className="w-full bg-red-600 hover:bg-red-700"
        >
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  );
}
