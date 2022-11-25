import tw from "twin.macro";
import CardClient from "../../components/CardClient"
import PopoverClickable from "../../components/PopoverClickable"
import { ListClientItem, ListClientsWrapper, PopupTrigger } from "./NewInvoice.style"
import Photo from "../../assets/images/mask-group.svg";

const dummyClients = [{
    name: 'Daquan Bridges',
    email: 'daquan@gmail.com',
}, {
    name: 'Heri Setiawan',
    email: 'heri.dehero@gmail.com',
}]

const ListClients = ({ hide }) => {
    return (
        <ListClientsWrapper>
            {
                dummyClients.map(client => {
                    return (
                        <ListClientItem onClick={hide} key={client.email}>
                            <CardClient
                                title="Default size card"
                                size="small"
                                style={{
                                    width: 300,
                                }}
                            >
                                <div tw="flex -mt-2">
                                    <img src={Photo} alt="profile" tw="w-14 h-14" />
                                    <div tw="grid ml-3 gap-0">
                                        <h3 tw="font-bold text-base">{client.name}</h3>
                                        <div>{client.email}</div>
                                    </div>
                                </div>
                            </CardClient>
                        </ListClientItem>
                    )
                })
            }
        </ListClientsWrapper>
    )
}

const InvoiceHead = () => {
    return (
        <PopoverClickable
            placement="right"
            renderContent={ListClients}
            renderChildren={({ visible, hide, show }) => {
                return (
                    <PopupTrigger tw="grid gap-0" onClick={visible ? hide : show}>
                        <span tw="text-gray-400">Billed To</span>
                        <span tw="text-xs">First Client</span>
                        <span tw="text-xs">Company Name</span>
                        <span tw="text-xs">Apt Building</span>
                        <span tw="text-xs">Jakarta, DKI Jakarta</span>
                        <span tw="text-xs">40555</span>
                        <span tw="text-xs">Indonesia</span>
                    </PopupTrigger>
                )
            }}
        />
    )
}

export default InvoiceHead