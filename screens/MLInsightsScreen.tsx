
import React, { useState, useCallback } from 'react';
import { predictDiamondPrice, getGoldRecommendation, generateStockingReport } from '../services/geminiService';

const InsightCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-brand-surface text-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-brand-gold">{title}</h2>
        {children}
    </div>
);

const Button: React.FC<{ onClick: () => void; children: React.ReactNode; isLoading?: boolean }> = ({ onClick, children, isLoading }) => (
    <button
        onClick={onClick}
        disabled={isLoading}
        className="w-full bg-brand-gold text-brand-dark font-bold py-2.5 px-4 rounded-lg hover:bg-brand-gold-hover transition-colors disabled:bg-brand-text-secondary disabled:cursor-not-allowed flex justify-center items-center"
    >
        {isLoading ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-brand-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        ) : children}
    </button>
);


const MLInsightsScreen: React.FC = () => {
    const [carat, setCarat] = useState(1.0);
    const [cut, setCut] = useState('Excellent');
    const [prediction, setPrediction] = useState({ predictionText: '', explanation: '' });
    const [isPredicting, setIsPredicting] = useState(false);

    const [ornament, setOrnament] = useState('Ring');
    const [purity, setPurity] = useState('18K');
    const [recommendation, setRecommendation] = useState('');
    const [isRecommending, setIsRecommending] = useState(false);
    
    const [report, setReport] = useState('');
    const [isReporting, setIsReporting] = useState(false);

    const handlePrediction = useCallback(async () => {
        setIsPredicting(true);
        setPrediction({ predictionText: '', explanation: '' });
        const result = await predictDiamondPrice(carat, cut);
        try {
            const parsedResult = JSON.parse(result);
            setPrediction(parsedResult);
        } catch (e) {
            setPrediction({ predictionText: "Error", explanation: "Failed to parse prediction." });
        }
        setIsPredicting(false);
    }, [carat, cut]);

    const handleRecommendation = useCallback(async () => {
        setIsRecommending(true);
        setRecommendation('');
        const result = await getGoldRecommendation(ornament, purity);
        setRecommendation(result);
        setIsRecommending(false);
    }, [ornament, purity]);

    const handleReport = useCallback(async () => {
        setIsReporting(true);
        setReport('');
        const result = await generateStockingReport();
        setReport(result);
        setIsReporting(false);
    }, []);

    return (
        <div className="space-y-6 animate-fade-in">
            <InsightCard title="Diamond Price Prediction">
                <div className="space-y-3">
                    <div>
                        <label className="text-sm font-medium text-brand-text-secondary">Carat Weight: {carat.toFixed(1)}</label>
                        <input type="range" min="0.5" max="5" step="0.1" value={carat} onChange={(e) => setCarat(parseFloat(e.target.value))} className="w-full h-2 bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-gold" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-brand-text-secondary">Cut Quality</label>
                        <select value={cut} onChange={(e) => setCut(e.target.value)} className="w-full bg-brand-dark border border-brand-border rounded p-2 mt-1">
                            <option>Excellent</option>
                            <option>Very Good</option>
                            <option>Good</option>
                            <option>Fair</option>
                        </select>
                    </div>
                    <Button onClick={handlePrediction} isLoading={isPredicting}>Get Prediction</Button>
                    {prediction.predictionText && (
                        <div className="bg-black/30 p-3 rounded-lg mt-4">
                            <p className="text-center font-bold text-2xl text-green-400">{prediction.predictionText}</p>
                            <p className="text-center text-sm text-brand-text-secondary">{prediction.explanation}</p>
                        </div>
                    )}
                </div>
            </InsightCard>

            <InsightCard title="Gold Quality Advisor">
                <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                        {['Ring', 'Necklace', 'Bangle'].map(type => (
                            <button key={type} onClick={() => setOrnament(type)} className={`py-2 rounded ${ornament === type ? 'bg-brand-gold text-brand-dark' : 'bg-brand-border text-white'}`}>{type}</button>
                        ))}
                    </div>
                    <input type="text" value={purity} onChange={e => setPurity(e.target.value)} placeholder="Purity (e.g., 22K)" className="w-full bg-brand-dark border border-brand-border rounded p-2" />
                    <Button onClick={handleRecommendation} isLoading={isRecommending}>Get Recommendation</Button>
                    {recommendation && (
                         <div className="bg-black/30 p-3 rounded-lg mt-4">
                            <p className="text-sm text-brand-text-primary">{recommendation}</p>
                        </div>
                    )}
                </div>
            </InsightCard>

            <InsightCard title="Historical Trends">
                <div className="space-y-3">
                    <p className="text-sm text-brand-text-secondary">Generate a smart stocking report based on market trends to optimize your inventory.</p>
                     <Button onClick={handleReport} isLoading={isReporting}>Generate Smart Stocking Report</Button>
                     {report && (
                         <div className="bg-black/30 p-3 rounded-lg mt-4 whitespace-pre-wrap">
                            <p className="text-sm text-brand-text-primary">{report}</p>
                        </div>
                    )}
                </div>
            </InsightCard>
        </div>
    );
};

export default MLInsightsScreen;