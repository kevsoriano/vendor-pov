import { useState } from 'react'
import HomeIcon from '../assets/home.png';
import SellIcon from '../assets/sell.png';
import SalesLedgerIcon from '../assets/sales-ledger.png';
import ReportingIcon from '../assets/reporting.png';
import ProductIcon from '../assets/product.png';
import CustomersIcon from '../assets/customers.png';
import SetupIcon from '../assets/setup.png';
import '../App.css'

const initialNavigation = [
  { 
    name: 'Home', 
    href: '#', 
    icon: HomeIcon, 
    current: true,
    children: []
  },
  { 
    name: 'Sell', 
    href: '#', 
    icon: SellIcon, 
    current: false,
    children: [
      {
        name: 'Sell',
        current: true
      },
      {
        name: 'Open/Close',
        current: false
      },
      {
        name: 'Sales History',
        current: false
      },
      {
        name: 'Cash Management',
        current: false
      },
      {
        name: 'Status',
        current: false
      },
      {
        name: 'Settings',
        current: false
      }
    ]
  },
  { 
    name: 'Sales Ledger', 
    href: '#', 
    icon: SalesLedgerIcon, 
    current: false,
    children: []
  },
  { 
    name: 'Reporting', 
    href: '#', 
    icon: ReportingIcon, 
    current: false,
    children: [
      {
        name: 'Retail Dashboard',
        current: false
      },
      {
        name: 'Sales Reports',
        current: false
      },
      {
        name: 'Inventory Reports',
        current: false
      },
      {
        name: 'Payment Reports',
        current: false
      },
      {
        name: 'Register Closures',
        current: false
      },
      {
        name: 'Gift Card Reports',
        current: false
      },
      {
        name: 'Store Credit Reports',
        current: false
      },
      {
        name: 'Tax Reports',
        current: false
      }
    ]
  },
  { 
    name: 'Products', 
    href: '#', 
    icon: ProductIcon, 
    current: false,
    children: [
      {
        name: 'Products',
        current: false
      },
      {
        name: 'Stock Control',
        current: false
      },
      {
        name: 'Promotions',
        current: false
      },
      {
        name: 'Price Books',
        current: false
      },
      {
        name: 'Product Types',
        current: false
      },
      {
        name: 'Suppliers',
        current: false
      },
      {
        name: 'Brands',
        current: false
      },
      {
        name: 'Product Tags',
        current: false
      }
    ] 
  },
  { 
    name: 'Customers', 
    href: '#', 
    icon: CustomersIcon, 
    current: false,
    children: [
      {
        name: 'Customers',
        current: false
      },
      {
        name: 'Groups',
        current: false
      }
    ]
  },
  { 
    name: 'Setup', 
    href: '#', 
    icon: SetupIcon, 
    current: false,
    children: [
      {
        name: 'General',
        current: false
      },
      {
        name: 'Billing',
        current: false
      },
      {
        name: 'Outlets and Registers',
        current: false
      },
      {
        name: 'Payment Types',
        current: false
      },
      {
        name: 'Sales Taxes',
        current: false
      },
      {
        name: 'Loyalty',
        current: false
      },
      {
        name: 'Users',
        current: false
      },
      {
        name: 'Add-ons',
        current: false
      },
      {
        name: 'Personal Tokens',
        current: false
      },
      {
        name: 'Gift Cards',
        current: false
      },
      {
        name: 'Store Credit',
        current: false
      }
    ]
  },
]

const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
]

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [navigation, setNavigation] = useState(initialNavigation);

  const handleMenuClick = (index: number) => {
    const updatedMenus = navigation.map((menu, idx) => {
        if (idx === index) {
            return { ...menu, current: true };
        } else {
            return { ...menu, current: false };
        }
    });
    setNavigation(updatedMenus);
  }

  const handleSubMenuClick = (index: number) => {
    const updatedMenus = navigation.map((menu) => {
      if(menu.current === true) {
        const updatedSubMenus = menu.children.map((submenu, idx) => {
          if(idx === index) {
            return {
              ...submenu,
              current: true
            }
          } else {
            return {
              ...submenu,
              current: false
            }
          }
        })
        return {
          ...menu,
          children: updatedSubMenus
        }
      } else {
        return menu
      }
    });
    setNavigation(updatedMenus)
  }

  return (
    <>
      <div className='bg-[#e4eaee]'>
        <ul>
          {navigation && navigation.map((item, index) =>
            <li key={item.name} className={`text-center p-2 text-xs ${item.current ? 'bg-[#ffffff]' : 'bg-[#e4eaee]'}`} onClick={() => handleMenuClick(index)}>
              <img src={item.icon} alt="" style={{ width: '28px', height: '24px', margin: 'auto' }}/>
              <div className='mt-2'>{item.name}</div>
            </li>
          )}
        </ul>
      </div>

      {navigation && navigation.map((item) => {
        if(item.current === true && item.children?.length !== 0) {
          return (
            <aside key={item.name} className={`aside show`}>
              <ul>
                  { item.children?.map((item, index) => (
                      <li key={item.name} className={`aside-item text-xs ${item.current ? 'bg-[#eff4f4]' : ''}`} onClick={() => handleSubMenuClick(index)}>
                          <a>
                              <p>{item.name}</p>
                          </a>
                      </li>
                  ))}
              </ul>
            </aside>
          )
        }
      })}
    </>
  )
}
