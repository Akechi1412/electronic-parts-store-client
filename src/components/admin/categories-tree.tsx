import { useState } from 'react';
import { CategoriesTreeProps } from '@/models';

export function CategoriesTree({
  categories,
  parentCategoryId = null,
  indentLevel = 0,
  onClick,
}: CategoriesTreeProps) {
  const childCategories = categories.filter((category) => category.parent_id === parentCategoryId);
  const [expandedList, setExpandedList] = useState<number[]>([]);

  const handleToggle = (categoryId: number) => {
    if (!hasChildren(categoryId) && onClick) {
      onClick(categoryId);
    } else {
      setExpandedList((prev) => {
        if (isExpanded(categoryId)) {
          return expandedList.filter((item) => item !== categoryId);
        } else {
          return [...prev, categoryId];
        }
      });
    }
  };

  const hasChildren = (categoryId: number): boolean => {
    return categories.some((category) => category.parent_id === categoryId);
  };

  const isExpanded = (categoryId: number): boolean => {
    return expandedList.includes(categoryId);
  };

  return (
    <ul className="">
      {childCategories.map((category) => {
        const hasChildCategories = hasChildren(category.id);
        return (
          <li key={category.id}>
            <div
              onClick={() => handleToggle(category.id)}
              style={{ paddingLeft: `${indentLevel * 12}px` }}
              className="p-1 flex gap-x-1 justify-between cursor-pointer hover:bg-malibu-50"
            >
              <span>{category.name}</span>
              {hasChildCategories && (
                <>
                  {isExpanded(category.id) ? (
                    <span className="flex-shrink-0 pr-[2px]">[ - ]</span>
                  ) : (
                    <span className="flex-shrink-0">[ + ]</span>
                  )}
                </>
              )}
            </div>
            {isExpanded(category.id) && (
              <CategoriesTree
                onClick={onClick}
                categories={categories}
                parentCategoryId={category.id}
                indentLevel={indentLevel + 1}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
