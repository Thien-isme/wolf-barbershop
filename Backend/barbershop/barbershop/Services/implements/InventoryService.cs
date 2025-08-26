using barbershop.Models.Entitys;

namespace barbershop.Services.implements
{
    using barbershop.Models.ResponseDTOs;
    using barbershop.Repositorys.implements;

    public class InventoryService
    {
        private InventoryRepository inventoryRepository;
        private BaseResponse baseResponse = new BaseResponse();
        public InventoryService()
        {
            inventoryRepository = new InventoryRepository();
        }
        // TODO: Implement service methods for Inventory
    }
}
