import tw from "twin.macro";
import CardClient from "../../components/CardClient"
import PopoverClickable from "../../components/PopoverClickable"
import { ListClientItem, ListClientsWrapper, PopupTrigger } from "./NewInvoice.style"
import Photo from "../../assets/images/mask-group.svg";

const dummyClients = [{
    name: 'Daquan Bridges',
    email: 'daquan@gmail.com',
    company: 'Happy Company',
    address1: 'Studio 55l Helen Spring',
    address2: 'West Harrisonfurt',
    zipcode: 'CM0 7HA',
    country: 'United Kingdom',
}, {
    name: 'Heri Setiawan',
    email: 'heri.dehero@gmail.com',
    company: 'Company Name',
    address1: 'Apt Building',
    address2: 'Jakarta, DKI Jakarta',
    zipcode: '40555',
    country: 'Indonesia',
}]

const ListClients = ({ hide, setValue }) => {
    return (
        <ListClientsWrapper>
            {
                dummyClients.map(client => {
                    return (
                        <ListClientItem onClick={() => {
                            hide()
                            setValue(client)
                        }} key={client.email}>
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
            renderChildren={({ visible, value, hide, show }) => {
                return (
                    <PopupTrigger tw="grid gap-0" onClick={visible ? hide : show}>
                        <span tw="text-gray-400">Billed To</span>
                        <span tw="text-sm">{value.name}</span>
                        <span tw="text-sm">{value.company}</span>
                        <span tw="text-sm">{value.address1}</span>
                        <span tw="text-sm">{value.address2}</span>
                        <span tw="text-sm">{value.zipcode}</span>
                        <span tw="text-sm">{value.country}</span>
                    </PopupTrigger>
                )
            }}
            defaultValue={{
                name: 'First Client',
                company: 'Company Name',
                address1: 'Apt Building',
                address2: 'Jakarta, DKI Jakarta',
                zipcode: '40555',
                country: 'Indonesia',
            }}
        />
    )
}

export default InvoiceHead