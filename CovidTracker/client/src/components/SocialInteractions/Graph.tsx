import { useEffect, useState } from "react";

import { useTypedDispatch, useTypedSelector } from "../../hooks";
import { BarGraph } from "../../shared";
import { fetchSocialInteractionsGrouped } from "../../slices/socialInteraction";
import { TBarGraphProps, TFilterParam } from "../../types";

const SocialInteractionsGraph = () => {
  const dispatch = useTypedDispatch();
  const label = "Social Interaction";
  const { socialInteractionsGrouped } = useTypedSelector(state => state.socialInteraction);
  const [state, setState] = useState<TBarGraphProps>({ x: [], y: [] });
  const yAxisLabel = "Number of Social Interactions";

  const formatDate = (d: string | number) => {
    return new Date(d).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
  };

  useEffect(() => {
    const filter: TFilterParam = {
      field: "date",
      fromDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      grouped: true,
      toDate: new Date()
    };

    (async () => {
      dispatch(fetchSocialInteractionsGrouped(filter));
    })();
  }, [dispatch]);

  useEffect(() => {
    if (!socialInteractionsGrouped) return;

    const datasets = [];

    for (let i = 6; i >= 0; i--) {
      const date = formatDate(Date.now() - 1000 * 60 * 60 * 24 * i);
      const count = socialInteractionsGrouped.find(item => formatDate(item._id) === date)?.count || 0;
      datasets.push({ date, count });
    }

    const x = datasets.map(item => item.date);
    const y = datasets.map(item => item.count);

    setState(prevState => ({ ...prevState, label, x, y, yAxisLabel }));
  }, [socialInteractionsGrouped]);

  return <BarGraph {...state} />;
};

export default SocialInteractionsGraph;
