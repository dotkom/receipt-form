# Receipt Form

This application serves as a way to automatically create a receipt form for usage in Linjeforeningen Online.

## Application architecture

The frontend is a React app bundled with Vite. It uses shadcn/ui for the components.

The backend is for now unfortunately python application that is hosted on aws Lambda. 

The infra is located in https://github.com/dotkom/terraform-monorepo/tree/main/prod/receipt.

## Ordered TODO:
- [ ] Clean up frontend to make it ready for production
- [ ] One end to end test would be nice to have to make it easier to make changes
- [ ] Think about if it makes sense to migrate to monoweb. 
- [ ] CI/CD pipeline
- [ ] Message on slack if a pdf generation fails
- [ ] Env in doppler
