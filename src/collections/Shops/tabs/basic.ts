import type { Field } from "payload";
import { EXPERIMENTAL_TableFeature, FixedToolbarFeature, InlineToolbarFeature, lexicalEditor, UploadFeature } from '@payloadcms/richtext-lexical'

export const basic: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'logo',
        type: 'upload',
        relationTo: 'media',
        hasMany: false,
        label: {
          ja: 'ロゴ',
          en: 'Logo',
        },
      },
      {
        name: 'images',
        type: 'upload',
        relationTo: 'media',
        hasMany: true,
        label: {
          ja: 'トップ画像',
          en: 'Images',
        },
      },
    ]
  },
  {
    name: 'description',
    type: 'richText',
    required: true,
    localized: true,
    label: {
      ja: '店舗説明',
      en: 'Description',
    },
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          UploadFeature(),
        ]
      },
    }),
  },
  {
    type: 'row',
    fields: [
      {
        name: 'categories',
        type: 'relationship',
        relationTo: 'categories',
        label: {
          ja: 'カテゴリ',
          en: 'Categories',
        },
        hasMany: true,
        localized: true,
      },
      {
        name: 'area',
        type: 'relationship',
        relationTo: 'areas',
        label: {
          ja: 'エリア',
          en: 'Area',
        },
        hasMany: false,
        localized: true,
      },
      {
        name: 'paymentMethods',
        type: 'relationship',
        relationTo: 'payment-methods',
        label: {
          ja: '支払い方法',
          en: 'Payment Methods',
        },
        hasMany: true,
        localized: true,
      },
    ]
  },
  {
    name: 'nearestStation',
    type: 'text',
    required: true,
    localized: true,
    label: {
      ja: '最寄駅',
      en: 'Nearest Station',
    },
  },
  {
    name: 'address',
    type: 'text',
    required: true,
    localized: true,
    label: {
      ja: '住所',
      en: 'Address',
    },
  },
  {
    name: 'location',
    type: 'point',
    label: {
      ja: '位置',
      en: 'Location',
    },
  },
  {
    name: 'tags',
    type: 'text',
    required: true,
    localized: true,
    label: {
      ja: 'タグ',
      en: 'Tags',
    },
    admin: {
      placeholder: 'タグを入力してください (カンマ区切り) 例: 英語対応可能、日本人スタッフなど',
    }
  },
  {
    type: 'row',
    fields: [
      {
        name: 'openHour',
        type: 'date',
        admin: {
          date: {
            pickerAppearance: 'timeOnly',
            displayFormat: 'h:mm',
          },
        },
        required: true,
        label: {
          ja: '開店時間',
          en: 'Open Hour',
        },
      },
      {
        name: 'closeHour',
        type: 'date',
        admin: {
          date: {
            pickerAppearance: 'timeOnly',
            displayFormat: 'h:mm',
          },
        },
        required: true,
        label: {
          ja: '閉店時間',
          en: 'Close Hour',
        },
      },
    ]
  },
  {
    label: {
      ja: '連絡先',
      en: 'Contact',
    },
    type: 'collapsible',
    admin: {
      initCollapsed: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'phoneNumber',
            type: 'group',
            fields: [
              { name: 'phoneNumber', type: 'text', required: true },
              { name: 'phoneNumber2', type: 'text' },
            ],
            admin: {
              width: '50%',
            },
            label: {
              ja: '電話番号',
              en: 'Phone Number',
            },
          },
          {
            name: 'line',
            type: 'group',
            fields: [
              { name: 'platform', type: 'text', required: true },
              { name: 'qrCode', type: 'upload', relationTo: 'media' },
            ],
            admin: {
              width: '50%',
            },
            label: {
              ja: 'LINE',
              en: 'LINE',
            },
          },
          {
            name: 'weChat',
            type: 'group',
            fields: [
              { name: 'platform', type: 'text', required: true },
              { name: 'qrCode', type: 'upload', relationTo: 'media' },
            ],
            admin: {
              width: '50%',
            },
            label: {
              ja: 'WeChat',
              en: 'WeChat',
            },
          },
          {
            name: 'whatsapp',
            type: 'group',
            fields: [
              { name: 'platform', type: 'text', required: true },
              { name: 'qrCode', type: 'upload', relationTo: 'media' },
            ],
            admin: {
              width: '50%',
            },
            label: {
              ja: 'WhatsApp',
              en: 'WhatsApp',
            },
          },
        ]
      }
    ]
  },
]