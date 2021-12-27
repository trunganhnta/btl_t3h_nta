import "./widgetLg.css"
import cat from "../../IMG/cat.jpg"

export default function WidgetLg() {
    const Button = ({type}) =>{
        return <button className={"widgetLgButton " + type}>{type}</button>
    }
    return (
        <div className="widgetLg">
            <h3 className="widgetLgTitle">Latest transactions</h3>
            <table className="widgetLgTable">
                <tr className="widgetLgTr">
                    <th className="widgetLgTh">Customer</th>
                    <th className="widgetLgTh">Date</th>
                    <th className="widgetLgTh">Amount</th>
                    <th className="widgetLgTh">Status</th>
                </tr>
                <tr className="widgetTr">
                    <td className="widgetLgUser">
                        <img src={cat} alt="" className="widgetLgUserImg" />
                        <span className="widgetLgName">Jane</span>
                    </td>
                    <td className="widgetLgDate">2 Jun 2021</td>
                    <td className="widgetLgAmount">100</td>
                    <td className="widgetLgStatus">
                        <Button type="Approved"></Button>
                    </td>
                </tr>
                <tr className="widgetTr">
                    <td className="widgetLgUser">
                        <img src={cat} alt="" className="widgetLgUserImg" />
                        <span className="widgetLgName">Jane</span>
                    </td>
                    <td className="widgetLgDate">2 Jun 2021</td>
                    <td className="widgetLgAmount">100</td>
                    <td className="widgetLgStatus">
                        <Button type="Decline"></Button>
                    </td>
                </tr>
                <tr className="widgetTr">
                    <td className="widgetLgUser">
                        <img src={cat} alt="" className="widgetLgUserImg" />
                        <span className="widgetLgName">Jane</span>
                    </td>
                    <td className="widgetLgDate">2 Jun 2021</td>
                    <td className="widgetLgAmount">100</td>
                    <td className="widgetLgStatus">
                        <Button type="Pending"></Button>
                    </td>
                </tr>
            </table>
        </div>
    )
}
