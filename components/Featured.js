import { CardSpotlightDemo } from "@/components/ui/card-spotlight-demo";
import { CardSpotlight } from "@/components/ui/card-spotlight";

import CardDemo from "@/components/blocks/cards-demo-3";

export default function Featured() {
  return (
    <section className="featured py-24 bg-frappe-base">
      
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-frappe-text mb-12 text-center">Featured</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="h-full">
            <CardSpotlightDemo 
              
              radius={360}
              color="rgba(100, 100, 238, 0.3)"
            >
              
            </CardSpotlightDemo>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-frappe-text flex-col">
            
            <CardDemo title="Live Servers" description="24/7 Servers" />
            <CardDemo title="Certifications" description="CompTIA N10-008 Network +" />
            <CardDemo title="Microsoft Certified" description="I hold Certifications for Microsoft Active Directory as well as Microsoft Excel and Word" />
            <CardDemo title="Specialties" description={
              <ul className="list-disc list-inside">
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
                <li>Python</li>
                <li>Linux</li>
              </ul>
            } />
          </div>
        </div>
      </div>
    </section>
  );
}
