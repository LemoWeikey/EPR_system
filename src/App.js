import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import CatalogPage from './components/CatalogPage';
import MainProductForm from './components/MainProductForm';
import SubItemForm from './components/SubItemForm';
import DeclaredItemsModal from './components/DeclaredItemsModal';
import SummaryModal from './components/SummaryModal';

const RecyclingCostNavigator = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSubsection, setSelectedSubsection] = useState(null);
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [animationClass, setAnimationClass] = useState('');

  const [mainProducts, setMainProducts] = useState([]);
  const [currentMainProduct, setCurrentMainProduct] = useState({
    productName: '',
    unit: 'Thùng',
    domesticRevenue: '',
    quantity: ''
  });
  const [editingMainProductIndex, setEditingMainProductIndex] = useState(null);
  const [showMainProductForm, setShowMainProductForm] = useState(false);

  const [subItems, setSubItems] = useState({});
  const [showSubItemForm, setShowSubItemForm] = useState(false);
  const [currentSubItem, setCurrentSubItem] = useState(null);
  const [currentMainProductIndex, setCurrentMainProductIndex] = useState(null);

  const [tempSubItems, setTempSubItems] = useState([{
    id: Date.now(),
    productName: '',
    packagingType: 'direct',
    specification: '',
    weight: ''
  }]);

  const [showDeclaredItems, setShowDeclaredItems] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const openMainProductForm = () => {
    setCurrentMainProduct({
      productName: '',
      unit: 'Thùng',
      domesticRevenue: '',
      quantity: ''
    });
    setEditingMainProductIndex(null);
    setShowMainProductForm(true);
  };

  const editMainProduct = (index) => {
    setCurrentMainProduct({ ...mainProducts[index] });
    setEditingMainProductIndex(index);
    setShowMainProductForm(true);
  };

  const saveMainProduct = () => {
    if (currentMainProduct.productName && currentMainProduct.quantity && parseFloat(currentMainProduct.quantity) > 0) {
      if (editingMainProductIndex !== null) {
        const updated = [...mainProducts];
        updated[editingMainProductIndex] = { ...currentMainProduct };
        setMainProducts(updated);
      } else {
        setMainProducts([...mainProducts, { ...currentMainProduct }]);
      }
      setShowMainProductForm(false);
    }
  };

  const deleteMainProduct = (index) => {
    setMainProducts(mainProducts.filter((_, i) => i !== index));
    const newSubItems = { ...subItems };
    delete newSubItems[index];
    setSubItems(newSubItems);
  };

  const openCatalog = (mainProductIndex) => {
    setCurrentMainProductIndex(mainProductIndex);
    setCurrentPage('catalog');
  };

  const handleSectionClick = (section) => {
    setAnimationClass('slide-out');
    setTimeout(() => {
      setSelectedSection(section);
      setSelectedSubsection(null);
      setBreadcrumb([{ name: 'Danh mục bao bì', level: 'catalog' }]);
      setAnimationClass('slide-in');
    }, 150);
  };

  const handleSubsectionClick = (subsection) => {
    setAnimationClass('slide-out');
    setTimeout(() => {
      setSelectedSubsection(subsection);
      setBreadcrumb([
        { name: 'Danh mục bao bì', level: 'catalog' },
        { name: selectedSection.name, level: 'section' }
      ]);
      setAnimationClass('slide-in');
    }, 150);
  };

  const handleBackFromCatalog = () => {
    if (selectedSubsection) {
      setAnimationClass('slide-out');
      setTimeout(() => {
        setSelectedSubsection(null);
        setBreadcrumb([{ name: 'Danh mục bao bì', level: 'catalog' }]);
        setAnimationClass('slide-in');
      }, 150);
    } else if (selectedSection) {
      setAnimationClass('slide-out');
      setTimeout(() => {
        setSelectedSection(null);
        setBreadcrumb([]);
        setAnimationClass('slide-in');
      }, 150);
    } else {
      setCurrentPage('home');
      setSelectedSection(null);
      setSelectedSubsection(null);
      setBreadcrumb([]);
    }
  };

  const openSubItemForm = (item) => {
    setCurrentSubItem(item);
    setTempSubItems([{
      id: Date.now(),
      productName: item.name,
      packagingType: 'direct',
      specification: '',
      weight: ''
    }]);
    setEditingSubItemIndices(null); // Reset editing mode
    setShowSubItemForm(true);
  };

  const addTempSubItem = () => {
    setTempSubItems([...tempSubItems, {
      id: Date.now() + Math.random(),
      productName: currentSubItem?.name || '',
      packagingType: 'direct',
      specification: '',
      weight: ''
    }]);
  };

  const removeTempSubItem = (id) => {
    if (tempSubItems.length > 1) {
      setTempSubItems(tempSubItems.filter(item => item.id !== id));
    }
  };

  const updateTempSubItem = (id, field, value) => {
    setTempSubItems(tempSubItems.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const saveSubItems = () => {
    const validItems = tempSubItems.filter(item =>
      item.productName && item.weight && parseFloat(item.weight) > 0
    );

    if (validItems.length > 0 && currentMainProductIndex !== null && currentSubItem) {
      const newSubItems = { ...subItems };

      // Check if we're editing an existing item
      if (editingSubItemIndices) {
        // Update existing item
        newSubItems[editingSubItemIndices.mainIndex][editingSubItemIndices.subIndex] = {
          ...validItems[0],
          catalogItem: currentSubItem,
          section: selectedSection,
          subsection: selectedSubsection
        };
      } else {
        // Add new items
        if (!newSubItems[currentMainProductIndex]) {
          newSubItems[currentMainProductIndex] = [];
        }

        validItems.forEach(item => {
          newSubItems[currentMainProductIndex].push({
            ...item,
            catalogItem: currentSubItem,
            section: selectedSection,
            subsection: selectedSubsection
          });
        });
      }

      setSubItems(newSubItems);
      setShowSubItemForm(false);
      setCurrentSubItem(null);
      setEditingSubItemIndices(null);
    }
  };

  const deleteSubItem = (mainProductIndex, subItemIndex) => {
    const newSubItems = { ...subItems };
    newSubItems[mainProductIndex].splice(subItemIndex, 1);
    if (newSubItems[mainProductIndex].length === 0) {
      delete newSubItems[mainProductIndex];
    }
    setSubItems(newSubItems);
  };

  const [editingSubItemIndices, setEditingSubItemIndices] = useState(null);

  const openEditSubItem = (mainProductIndex, subItemIndex) => {
    const subItem = subItems[mainProductIndex][subItemIndex];
    setCurrentMainProductIndex(mainProductIndex);
    setCurrentSubItem(subItem.catalogItem);
    setTempSubItems([{
      id: Date.now(),
      productName: subItem.productName,
      packagingType: subItem.packagingType,
      specification: subItem.specification,
      weight: subItem.weight
    }]);
    setEditingSubItemIndices({ mainIndex: mainProductIndex, subIndex: subItemIndex });
    setShowSubItemForm(true);

    // Navigate to catalog if needed
    if (currentPage !== 'catalog') {
      setSelectedSection(subItem.section);
      setSelectedSubsection(subItem.subsection);
      setBreadcrumb([
        { name: 'Danh mục bao bì', level: 'catalog' },
        { name: subItem.section.name, level: 'section' }
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 -left-32 w-64 h-64 bg-emerald-300 rounded-full opacity-15"></div>
        <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-teal-200 rounded-full opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        {currentPage === 'landing' && (
          <LandingPage onStart={() => setCurrentPage('home')} />
        )}

        {currentPage === 'home' && (
          <HomePage
            mainProducts={mainProducts}
            subItems={subItems}
            animationClass={animationClass}
            onOpenMainProductForm={openMainProductForm}
            onShowDeclaredItems={() => setShowDeclaredItems(true)}
            onShowSummary={() => setShowSummary(true)}
            onDeleteMainProduct={deleteMainProduct}
            onOpenCatalog={openCatalog}
            onEditMainProduct={editMainProduct}
          />
        )}

        {currentPage === 'catalog' && (
          <CatalogPage
            selectedSection={selectedSection}
            selectedSubsection={selectedSubsection}
            breadcrumb={breadcrumb}
            animationClass={animationClass}
            currentMainProductIndex={currentMainProductIndex}
            mainProducts={mainProducts}
            subItems={subItems}
            onBack={handleBackFromCatalog}
            onSectionClick={handleSectionClick}
            onSubsectionClick={handleSubsectionClick}
            onOpenSubItemForm={openSubItemForm}
            onGoHome={() => setCurrentPage('home')}
            onEditSubItem={openEditSubItem}
            onDeleteSubItem={deleteSubItem}
          />
        )}
      </div>

      {showMainProductForm && (
        <MainProductForm
          currentMainProduct={currentMainProduct}
          isEditing={editingMainProductIndex !== null}
          onProductChange={setCurrentMainProduct}
          onSave={saveMainProduct}
          onClose={() => {
            setShowMainProductForm(false);
            setEditingMainProductIndex(null);
          }}
        />
      )}

      {showSubItemForm && (
        <SubItemForm
          currentSubItem={currentSubItem}
          tempSubItems={tempSubItems}
          mainProducts={mainProducts}
          currentMainProductIndex={currentMainProductIndex}
          isEditing={editingSubItemIndices !== null}
          onUpdateTempSubItem={updateTempSubItem}
          onAddTempSubItem={addTempSubItem}
          onRemoveTempSubItem={removeTempSubItem}
          onSave={saveSubItems}
          onClose={() => {
            setShowSubItemForm(false);
            setEditingSubItemIndices(null);
          }}
        />
      )}

      {showDeclaredItems && (
        <DeclaredItemsModal
          mainProducts={mainProducts}
          subItems={subItems}
          onClose={() => setShowDeclaredItems(false)}
          onDeleteSubItem={deleteSubItem}
          onEditSubItem={openEditSubItem}
        />
      )}

      {showSummary && (
        <SummaryModal
          mainProducts={mainProducts}
          subItems={subItems}
          onClose={() => setShowSummary(false)}
        />
      )}

      <style jsx>{`
        .slide-in {
          animation: slideIn 0.3s ease-out forwards;
        }

        .slide-out {
          animation: slideOut 0.15s ease-in forwards;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default RecyclingCostNavigator;
