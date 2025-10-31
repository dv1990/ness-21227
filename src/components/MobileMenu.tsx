import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Menu, 
  Home,
  Building2,
  Wrench,
  LayoutGrid,
  ArrowRight,
  Shield
} from "lucide-react";

import { LucideIcon } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  mainNavItems: Array<{
    label: string;
    href: string;
    icon: LucideIcon;
    description: string;
  }>;
}

const MobileMenu = ({ isOpen, setIsOpen, mainNavItems }: MobileMenuProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-muted/50">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 p-0 bg-background/95 backdrop-blur-xl">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-border/20">
            <Link to="/" className="flex items-center space-x-3" onClick={() => setIsOpen(false)}>
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-md">
                <span className="text-primary-foreground font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-semibold">NESS Energy</span>
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-2">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl text-sm transition-colors hover:bg-muted/50 group"
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-4 h-4" />
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          <div className="p-6 border-t border-border/20">
            <Link to="/contact/homeowner" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-medium">
                Get Quote
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
