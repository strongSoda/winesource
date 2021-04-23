import { motion } from 'framer-motion';
import CSSVARIABLES from 'global/constants/css/variables';
import styled from 'styled-components';

const SellerOrdersWrapper = styled.div`
    .content {
        margin-top: 10vh;
        text-align: center;
    
        .requests {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            gap: 2em;
            max-width: 60vw;
            margin: 0 auto;

            .request {
                margin-top: 4vh;
                text-align: left;
                border: 1px solid ${CSSVARIABLES.gray1};
                padding: 2em;
                img {
                    height: 200px;
                }
                p {
                    text-transform: capitalize;
                }
                .prices {
                    display: flex;
                    gap: 1em;
                } 
                .price {
                    color: ${CSSVARIABLES.secondaryColor};
                    font-weight: 600;
                }
                .avg_price {
                    text-decoration: line-through;
                    color: ${CSSVARIABLES.gray1}
                }

                                .details {
                    font-size: .8em;                
                    .value{
                        color: ${CSSVARIABLES.secondaryColor};
                    }
                }
                .actions {
                    Button {
                        width: 100%;
                    }
                    .inline {
                        Button {
                            width: auto;
                            border: 2px solid ${CSSVARIABLES.secondaryColor};
                        }
                    }
                }
            }
        }
    }

    @media (max-width: 768px) {
        .content {
            .requests {
                max-width: 80%;
            }
        }
    }
`;

export { SellerOrdersWrapper };
