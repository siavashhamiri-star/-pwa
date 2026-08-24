import React from 'react';
import {
  MapPin,
  Star,
  Eye,
  Heart,
  Volume2,
  Phone,
  MessageCircle,
  Tag,
  CheckCircle2,
} from 'lucide-react';
import { BusinessProfile } from '../../types';
import { VerificationBadge, AccessibilityFeatureBadge } from '../../components/common/Badge';
import { formatPersianNumber, toPersianDigits } from '../../utils/persian';
import { useAccessibility } from '../../context/AccessibilityContext';

interface BusinessCardProps {
  business: BusinessProfile;
  categoryTitle?: string;
  onSelect: (business: BusinessProfile) => void;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({
  business,
  categoryTitle,
  onSelect,
}) => {
  const { announce } = useAccessibility();

  return (
    <div
      id={`business-card-${business.id}`}
      className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group cursor-pointer"
      onClick={() => {
        onSelect(business);
        announce(`باز کردن ویترین ${business.name}`);
      }}
      role="article"
      aria-label={`ویترین ${business.name} در شهر ${business.city}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(business);
        }
      }}
    >
      {/* Cover Image & Discount Badge */}
      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
        <img
          src={business.coverImage}
          alt={business.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/10" />

        {/* Top Badges */}
        <div className="absolute top-3 right-3 flex flex-wrap gap-1.5">
          <VerificationBadge status={business.verificationStatus} />
        </div>

        {business.specialDiscountsForDisabled && (
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-rose-500 text-white rounded-full text-[11px] font-black shadow-xs flex items-center gap-1">
            <Tag className="w-3 h-3" />
            <span>{toPersianDigits(business.discountPercentage || 15)}٪ تخفیف توانمندان</span>
          </div>
        )}

        {/* Rating and City Bottom overlay */}
        <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-xl font-bold">
            <MapPin className="w-3.5 h-3.5 text-indigo-300" />
            <span>{business.city}</span>
          </div>

          <div className="flex items-center gap-1 bg-amber-500/90 text-slate-950 px-2.5 py-1 rounded-xl font-black">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="font-latin">{toPersianDigits(business.rating)}</span>
            <span className="text-[10px] opacity-80">({toPersianDigits(business.ratingCount)})</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5">
        <div>
          {categoryTitle && (
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-1 block">
              {categoryTitle}
            </span>
          )}
          <h3 className="font-black text-base text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {business.name}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {business.slogan || business.description}
          </p>
        </div>

        {/* Accessibility Badges (First 2) */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {business.accessibilityFeatures.slice(0, 2).map((feat) => (
            <AccessibilityFeatureBadge key={feat} feature={feat} />
          ))}
          {business.accessibilityFeatures.length > 2 && (
            <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold">
              +{toPersianDigits(business.accessibilityFeatures.length - 2)} امکان دیگر
            </span>
          )}
        </div>

        {/* Card Footer: Creator info and action button */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={business.ownerAvatar}
              alt={business.ownerName}
              className="w-7 h-7 rounded-full object-cover border border-slate-200"
            />
            <span className="text-xs font-semibold text-slate-700">{business.ownerName}</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(business);
            }}
            className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl transition-colors"
          >
            مشاهده ویترین
          </button>
        </div>
      </div>
    </div>
  );
};
