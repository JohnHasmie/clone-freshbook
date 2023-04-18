import { useContext, useMemo } from "react";
import moment from "moment";
import AppContext from "../../components/context/AppContext";
import "twin.macro";

const RecurringSchedule = ({ recurring: config, total }) => {
    const { user } = useContext(AppContext);
    const filter = {
        currency: user?.data?.base_currency
    }
    const intervals = {
        'weekly': 'weeks',
        'monthly': 'months',
        'yearly': 'years',
    }
    const recurring = useMemo(() => {
        try {
            return JSON.parse(config)
        } catch {
            return {}
        }
    }, [config])
    return (
        <>
            <table tw="my-6">
                <thead>
                    <tr tw="border-b border-gray-300 text-right font-bold">
                        <th tw="text-left  py-2">Payment date</th>
                        <th>Rate</th>
                        <th>Quantity</th>
                        <th>Line Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Array.from(Array(parseInt(recurring?.recurring_max || 0))).map((item, i) => (
                            <tr tw="border-gray-300 text-right" key={i}>
                                <th tw="pl-3 text-left py-2">
                                    {
                                        moment(new Date(recurring?.recurring_next_issue_date || null)).add(i, intervals[recurring?.recurring_type || 'weekly']).format(
                                            "MMM DD, YYYY"
                                        )
                                    }
                                </th>
                                <td>
                                    {filter?.currency == "GBP" ? "£" : "$"} {total}
                                </td>
                                <td>1</td>
                                <td>
                                    {filter?.currency == "GBP" ? "£" : "$"} {total}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default RecurringSchedule