
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useLoaderData } from 'react-router';
import { commonCode } from '../../types/types';
import BbsTable from './bbsTable';


const BbsMain: React.FC = () => {
    const sectionComponent = (bbsSectionDetail:commonCode)=>{
        return (
            <Tab key={bbsSectionDetail.detail_code_idx} eventKey={bbsSectionDetail.detail_code_idx} title={bbsSectionDetail.code_value}>
                <BbsTable/>
            </Tab>
        )
    };
    const params:{bbsId: string, bbsSection:commonCode[]} = useLoaderData() as {bbsId: string, bbsSection:commonCode[]};
    const sections = params.bbsSection;
    return (
        <div style={{width:"80%", margin: "0 10% 0 10%"}}>
            <Tabs
                defaultActiveKey={1}
                id="bbs-tab"
                className="mb-3"
                justify
                
            >
                {sections.map(sectionComponent)}
            </Tabs>
        </div>


    );
}

export default BbsMain;