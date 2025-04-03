import {
  Images,
  Users,
  BadgePercent,
  LayoutList,
  SquareActivity,
  ShoppingCart,
} from "lucide-react";

import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { getAllUserThunk } from "@/store/thunks/userThunks";
import { allBannerThunk } from "@/store/thunks/bannerThunks";
import { allPromoThunk } from "@/store/thunks/promoThunks";
import { allCategoryThunk } from "@/store/thunks/categoryThunks";
import { allActivityThunk } from "@/store/thunks/activityThunks";
import { allTransactionThunk } from "@/store/thunks/transactionThunks";
import { Link } from "react-router-dom";

export function SectionCards() {
  const dispatch = useDispatch<AppDispatch>();

  const { allUsers } = useSelector((state: RootState) => state.user);
  const { banner } = useSelector((state: RootState) => state.banner);
  const { promo } = useSelector((state: RootState) => state.promo);
  const { category } = useSelector((state: RootState) => state.category);
  const { activity } = useSelector((state: RootState) => state.activity);
  const { allTransaction } = useSelector(
    (state: RootState) => state.transaction
  );

  useEffect(() => {
    dispatch(getAllUserThunk());
    dispatch(allBannerThunk());
    dispatch(allPromoThunk());
    dispatch(allCategoryThunk());
    dispatch(allActivityThunk());
    dispatch(allTransactionThunk());
  }, [dispatch]);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <Link to="/dashboard/users">
          <CardHeader>
            <CardDescription>Total User</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {allUsers.length}
            </CardTitle>
            <CardAction>
              <Users size={40} />
            </CardAction>
          </CardHeader>
        </Link>
      </Card>

      <Card className="@container/card">
        <Link to="/dashboard/banners">
          <CardHeader>
            <CardDescription>Total Banner</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {banner.length}
            </CardTitle>
            <CardAction>
              <Images size={40} />
            </CardAction>
          </CardHeader>
        </Link>
      </Card>
      <Card className="@container/card">
        <Link to="/dashboard/promos">
          <CardHeader>
            <CardDescription>Total Promo</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {promo.length}
            </CardTitle>
            <CardAction>
              <BadgePercent size={40} />
            </CardAction>
          </CardHeader>
        </Link>
      </Card>
      <Card className="@container/card">
        <Link to="/dashboard/categories">
          <CardHeader>
            <CardDescription>Total Category</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {category.length}
            </CardTitle>
            <CardAction>
              <LayoutList size={40} />
            </CardAction>
          </CardHeader>
        </Link>
      </Card>
      <Card className="@container/card">
        <Link to="/dashboard/activities">
          <CardHeader>
            <CardDescription>Total Activity</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {activity.length}
            </CardTitle>
            <CardAction>
              <SquareActivity size={40} />
            </CardAction>
          </CardHeader>
        </Link>
      </Card>
      <Card className="@container/card">
        <Link to="/dashboard/transactions">
          <CardHeader>
            <CardDescription>Total Transaction</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {allTransaction.length}
            </CardTitle>
            <CardAction>
              <ShoppingCart size={40} />
            </CardAction>
          </CardHeader>
        </Link>
      </Card>
    </div>
  );
}
