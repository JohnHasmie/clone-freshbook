import tw from "twin.macro";
import CardClient from "../../components/CardClient"
import PopoverClickable from "../../components/PopoverClickable"
import { ListClientItem, ListClientsWrapper, PopupTrigger } from "./NewInvoice.style"
import Photo from "../../assets/images/mask-group.svg";
import { useQuery } from "react-query";
import axios from "axios";
import { useState } from 'react';
import { truncate } from "../../components/Utils";
import { useEffect } from 'react';
import { PlusOutlined } from "@ant-design/icons";

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

<<<<<<< HEAD
const ListClients = ({ hide, setValue }) => {
=======
const ListClients = ({ hide,setIsClient }) => {
    const [filter, setFilter] = useState({
        limit: 10,
        page: 1,
      });
    const { data: dataClients, status } = useQuery(
        ["clients", filter],
        async (key) =>
          axios
            .get("clients", {
              params: key.queryKey[1],
            })
            .then((res) => res.data.data)
      );

     
>>>>>>> origin/usamah
    return (
        <ListClientsWrapper tw="overflow-y-auto h-72">
            {status === "success" &&
                dataClients?.data?.map(client => {
                    return (
<<<<<<< HEAD
                        <ListClientItem onClick={() => {
                            hide()
                            setValue(client)
                        }} key={client.email}>
=======
                        <ListClientItem onClick={()=>{
                            setIsClient(client.id)
                            hide()
                        }} key={client.id}>
>>>>>>> origin/usamah
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
                                    <h3 tw="font-bold text-base">{truncate(client.company_name,20)}</h3>

                                        <h3 tw="font-bold text-gray-500 text-sm">{client.first_name} {client.last_name}</h3>
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

const InvoiceHead = ({clientProps}) => {
    const [isClient, setIsClient]=clientProps
    const [loading, setLoading] = useState(true);
  const [data, setData] = useState([])

useEffect(() => {
    if(isClient){
    const fetchData = async () =>{
        setLoading(true);
        try {
          const {data: response} = await axios.get(`clients/${isClient}`);
          setData(response?.data);
        } catch (error) {
          console.error(error);
        }
        setLoading(false);
      }
  
      fetchData();}
}, [isClient])


    return (
        <PopoverClickable
            placement="right"
            renderContent={ListClients}
<<<<<<< HEAD
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
=======
            setIsClient={setIsClient}
            renderChildren={({ visible, hide, show,setIsClient }) => {
                return (
                 <>

                 {loading && 
                        <PopupTrigger tw="grid gap-0" onClick={visible ? hide : show}>
                            <span tw="text-gray-400 text-left">Billed To</span>

                 <div tw="cursor-pointer border border-gray-200 hover:bg-blue-50 border-dashed flex w-40 h-20 rounded-md  mr-20 justify-center items-center">
                  <PlusOutlined tw="text-xl text-gray-400" />
                  <span tw="text-base ml-1  font-bold">Add Client</span>
                 </div>
                 </PopupTrigger>
                 }
                       {loading === false &&
                        <PopupTrigger tw="grid gap-0" onClick={visible ? hide : show}>
                            <span tw="text-gray-400 text-left">Billed To</span>

                           <span tw="text-xs">{data?.client?.first_name} {data?.client?.last_name}</span>
                           <span tw="text-xs">{data?.client?.company_name}</span>
                           <span tw="text-xs">{data?.client?.address}</span>
                           <span tw="text-xs">{data?.client?.city}</span>
                           <span tw="text-xs">{data?.client?.zip}</span>
                           <span tw="text-xs">{data?.client?.country}</span>
                       </PopupTrigger>}
                 </>
>>>>>>> origin/usamah
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