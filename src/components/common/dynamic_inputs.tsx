import { DynamicInputsProps, InputsData } from '@/models';
import { useState, useEffect } from 'react';
import { AddButton } from '@/components/common';
import Image from 'next/image';

export function DynamicInputs({
  className,
  placeholderInput1,
  placeholderInput2,
  initInputs,
  onInputsChange,
}: DynamicInputsProps) {
  const [inputs, setInputs] = useState<InputsData[]>(initInputs);

  const handleInputChange = (index: number, field: keyof InputsData, value: string) => {
    setInputs((prevInputs) => {
      const newInputs = [...prevInputs];
      newInputs[index][field] = value;
      return newInputs;
    });
    onInputsChange(inputs);
  };

  function handleAddRowClick() {
    const inputsLength = inputs.length;
    const lastInput1 = inputs[inputsLength - 1].input1.trim();
    const lastInput2 = inputs[inputsLength - 1].input2.trim();
    if (!lastInput1 || !lastInput2) return;
    setInputs((prevInputs) => [...prevInputs, { input1: '', input2: '' }]);
    onInputsChange([...inputs, { input1: '', input2: '' }]);
  }

  function handleDeleteInputClick(index: number) {
    if (inputs.length > 0) {
      const newInputs = [...inputs];
      newInputs.splice(index, 1);
      setInputs(newInputs);
      onInputsChange(newInputs);
    }
  }

  useEffect(() => {
    setInputs(initInputs);
  }, [initInputs]);

  return (
    <div className={`flex flex-col items-end ${className}`}>
      {inputs.map((item, index) => (
        <div key={index} className="flex gap-x-3 w-full items-center mb-4">
          <div className="flex flex-1 gap-x-4">
            <input
              onChange={(event) => handleInputChange(index, 'input1', event.target.value)}
              placeholder={placeholderInput1}
              value={item.input1}
              type="text"
              className="flex-1 bg-white h-8 rounded border border-ghost outline-none px-2"
            />
            <input
              onChange={(event) => handleInputChange(index, 'input2', event.target.value)}
              placeholder={placeholderInput2}
              value={item.input2}
              type="text"
              className="flex-1 bg-white h-8 rounded border border-ghost outline-none px-2"
            />
          </div>
          <Image
            src="\icons\Close_round_light.svg"
            alt="Xóa"
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={() => handleDeleteInputClick(index)}
          />
        </div>
      ))}
      <AddButton onClick={handleAddRowClick} title="Thêm hàng" />
    </div>
  );
}
