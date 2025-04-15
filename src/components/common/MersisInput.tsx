import React from 'react';
import { Form, Input } from 'antd';

interface MersisInputProps {
  name?: string;
  required?: boolean;
  disabled?: boolean;
}

const MersisInput: React.FC<MersisInputProps> = ({
  name = 'mersisNo',
  required = false,
  disabled = false,
}) => {
  // Mersis numarası doğrulama fonksiyonu
  const validateMersisNo = (mersisNo: string): boolean => {
    // 16 haneli olmalı
    if (mersisNo.length !== 16) return false;

    // Sadece rakamlardan oluşmalı
    if (!/^\d+$/.test(mersisNo)) return false;

    // 0 ile başlamalı
    if (!mersisNo.startsWith('0')) return false;

    // Mersis algoritması kontrolü
    const digits = mersisNo.split('').map(Number);
    
    // 1. Tek hanelerin toplamı (1,3,5,7,9,11,13,15. haneler)
    const oddSum = digits.filter((_, index) => index % 2 === 0)
      .reduce((sum, digit) => sum + digit, 0);
    
    // 2. Çift hanelerin toplamı (2,4,6,8,10,12,14,16. haneler)
    const evenSum = digits.filter((_, index) => index % 2 === 1)
      .reduce((sum, digit) => sum + digit, 0);
    
    // 3. Tek haneler toplamının 7 katından çift haneler toplamı çıkarılır
    const result = (oddSum * 7) - evenSum;
    
    // 4. Sonucun 10'a bölümünden kalan sıfır olmalıdır
    return result % 10 === 0;
  };

  return (
    <Form.Item
      name={name}
      label="Mersis No"
      rules={[
        { required: required, message: 'Lütfen Mersis numarasını giriniz' },
        {
          validator: async (_, value) => {
            if (!value) return;
            
            // Boşlukları kaldır
            const cleanValue = value.replace(/\s/g, '');
            
            if (cleanValue.length !== 16) {
              throw new Error('Mersis numarası 16 haneli olmalıdır');
            }
            
            if (!/^\d+$/.test(cleanValue)) {
              throw new Error('Mersis numarası sadece rakamlardan oluşmalıdır');
            }
            
            if (!cleanValue.startsWith('0')) {
              throw new Error('Mersis numarası 0 ile başlamalıdır');
            }
            
            if (!validateMersisNo(cleanValue)) {
              throw new Error('Geçersiz Mersis numarası');
            }
          },
        },
      ]}
      normalize={(value) => {
        // Sadece rakamları al ve 16 karakterle sınırla
        const numbers = value?.replace(/[^\d]/g, '').slice(0, 16) || '';
        
        // 4'lü gruplar halinde formatla
        return numbers.replace(/(\d{4})/g, '$1 ').trim();
      }}
    >
      <Input
        placeholder="0000 0000 0000 0000"
        disabled={disabled}
        maxLength={19} // 16 rakam + 3 boşluk
      />
    </Form.Item>
  );
};

export default MersisInput; 