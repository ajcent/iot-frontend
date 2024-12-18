import { Search, Terminal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import debounce from "lodash.debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchUID } from "@/services/uid";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function SearchSection() {
  const [query, setQuery] = useState<string>("");

  const debouncedSearch = debounce((nextValue: string) => {
    setQuery(nextValue);
  }, 2000);

  const { data } = useQuery({
    queryKey: ["searchResults", query],
    queryFn: () => fetchUID(query),
    enabled: query.length > 0,
    placeholderData: keepPreviousData,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const renderAlert = () => {
    if (!query || data?.data === undefined) return null;

    if (data?.data === null) {
      return (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle className="text-base font-semibold">
            The record does not exist
          </AlertTitle>
          <AlertDescription className="text-base">
            Please, check for any typographical errors.
          </AlertDescription>
        </Alert>
      );
    }

    return (
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle className="text-base">
          Heads up! <span className="font-semibold">{data.data.name}</span>
        </AlertTitle>
        <AlertDescription className="text-base">
          Your remaining amount is {data.data.amount} PHP
        </AlertDescription>
      </Alert>
    );
  };

  return (
    <section className="border rounded p-4 mb-8">
      <h3 className="text-base mb-2">
        <span className="font-medium">Have an account?</span>{" "}
        <span className="text-muted-foreground">Check it here.</span>
      </h3>
      <Label className="relative">
        <Input
          type="search"
          placeholder="Search.."
          className="pl-8"
          onChange={handleInputChange}
        />
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </Label>
      <div className="mt-4">{renderAlert()}</div>
    </section>
  );
}

export default SearchSection;
