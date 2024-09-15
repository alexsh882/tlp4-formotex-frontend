import InventoryEntriesList from "@/features/inventory-entries/inventory-entries-list";

export default function InventoryPage() {
  return (
    <>      
      <hgroup>
        <h1 className="text-4xl font-sans-accent mb-6">Inventario</h1>
      </hgroup>
      <InventoryEntriesList />
    </>
  );
}
