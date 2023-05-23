import { Schema, model, models } from 'mongoose';
import Joi from 'joi';
import type { MonthRecord, PlantCategoryRecord, PlantRecord } from '../types';

// Mongoose schema validators

const plantCategories: PlantCategoryRecord[] = [
  'vegetables',
  'fruits',
  'herbs',
  'flowers'
];
const months: MonthRecord[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const invalidMonthMsg = `{VALUE} is not a valid month. Valid months are 1-12.`;

const NAME_MAX_LENGTH = 20;
const VARIETY_MAX_LENGTH = 30;
const NOTES_MAX_LENGTH = 1000;

function hasSowFrom(this: PlantRecord) {
  return this.sowFrom !== null;
}

function hasSowUntil(this: PlantRecord) {
  return this.sowUntil !== null;
}

function hasHarvestFrom(this: PlantRecord) {
  return this.harvestFrom !== null;
}

function hasHarvestUntil(this: PlantRecord) {
  return this.harvestUntil !== null;
}

// Mongoose Schema

const PlantSchema = new Schema<PlantRecord>(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      maxLength: [
        NAME_MAX_LENGTH,
        `Cannot be longer than ${NAME_MAX_LENGTH} characters - {VALUE} exceeds the length limit.`
      ],
      trim: true
    },
    variety: {
      type: String,
      maxLength: [
        VARIETY_MAX_LENGTH,
        `Cannot be longer than ${VARIETY_MAX_LENGTH} characters - {VALUE} exceeds the length limit.`
      ],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required.'],
      lowercase: true,
      trim: true,
      enum: {
        values: plantCategories,
        message: `{VALUE} is not a valid plant category. The allowed categories are: ${plantCategories.join(
          ', '
        )}.`
      }
    },
    sowFrom: {
      type: Number,
      default: null,
      validate: [
        hasSowUntil,
        'The starting month of the sowing season is required if the ending month of the sowing season (sowUntil) is specified.'
      ],
      enum: {
        values: months,
        message: invalidMonthMsg
      }
    },
    sowUntil: {
      type: Number,
      default: null,
      validate: [
        hasSowFrom,
        'The ending month of the sowing season is required if the starting month of the sowing season (sowFrom) is specified.'
      ],
      enum: {
        values: months,
        message: invalidMonthMsg
      }
    },
    harvestFrom: {
      type: Number,
      default: null,
      validate: [
        hasHarvestUntil,
        'The starting month of the harvesting season is required if the ending month of the harvesting season (harvestUntil) is specified.'
      ],
      enum: {
        values: months,
        message: invalidMonthMsg
      }
    },
    harvestUntil: {
      type: Number,
      default: null,
      validate: [
        hasHarvestFrom,
        'The ending month of the harvesting season is required if the starting month of the harvesting season (harvestFrom) is specified.'
      ],
      enum: {
        values: months,
        message: invalidMonthMsg
      }
    },
    notes: {
      type: String,
      default: null,
      maxLength: [
        NOTES_MAX_LENGTH,
        `Cannot be longer than ${NOTES_MAX_LENGTH} characters - {VALUE} exceeds the length limit.`
      ],
      trim: true
    },
    isInTrash: {
      type: Boolean,
      required: true,
      default: false
    },
    userId: {
      type: String,
      required: true
    }
  },
  // Include null fields in the response
  { minimize: false }
);

// Model
export const Plant = models.plant || model<PlantRecord>('plant', PlantSchema); // models.plant solves "Cannot overwrite `plant` model once compiled" error

// Pre-save validators

export const validatePlantSchema = ({
  plant,
  isEditing
}: {
  plant: unknown;
  isEditing: boolean;
}): null | string[] => {
  const JoiMonth = Joi.number().integer().min(1).max(12);

  const basePlantSchema = Joi.object({
    name: Joi.string().trim().max(NAME_MAX_LENGTH).required(),
    variety: Joi.string().allow(null).trim().max(VARIETY_MAX_LENGTH).required(),
    category: Joi.string()
      .valid(...plantCategories)
      .required(),
    sowFrom: JoiMonth.allow(null).required(),
    sowUntil: Joi.when('sowFrom', {
      is: JoiMonth,
      then: JoiMonth,
      otherwise: Joi.valid(null)
    }).required(),
    harvestFrom: JoiMonth.allow(null).required(),
    harvestUntil: Joi.when('harvestFrom', {
      is: JoiMonth,
      then: JoiMonth,
      otherwise: Joi.valid(null)
    }).required()
  });

  const editPlantSchema = basePlantSchema.keys({
    notes: Joi.string().allow(null).trim().max(NOTES_MAX_LENGTH).required()
  });

  const plantSchema = isEditing ? editPlantSchema : basePlantSchema;

  const { error } = plantSchema.validate(
    plant,
    // Get all errors (not only the first one)
    { abortEarly: false }
  );
  if (error) {
    const errorList: string[] = [];
    error.details.forEach(error => errorList.push(error.message));
    return errorList;
  }
  return null;
};

export const validatePlantStatusSchema = (status: unknown): null | string => {
  const statusSchema = Joi.object({
    isInTrash: Joi.boolean().required()
  });
  const { error } = statusSchema.validate(status);
  if (error) return error.message;
  return null;
};
